const { db } = require('./models');
const axios = require('axios');
const CronJob = require('cron').CronJob;

const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    try {
        return await axios.get(url);
    } catch (error) {
        if (retries > 0) {
            console.warn(`Retrying... ${retries} attempts left`);
            await new Promise(res => setTimeout(res, delay));
            return fetchWithRetry(url, retries - 1, delay);
        } else {
            throw error;
        }
    }
};

const createAutoBotData = async (io) => {
    try {
        let autobotCounter = 0;

        while (autobotCounter < 500) {
            const { data: autobots } = await fetchWithRetry('https://jsonplaceholder.typicode.com/users');

            for (const autobotData of autobots) {
                if (autobotCounter >= 500) break;

                let uniqueSuffix = `_${autobotCounter + 1}`;
                let uniqueName = `${autobotData.name}${uniqueSuffix}`;
                let uniqueUsername = `${autobotData.username}${uniqueSuffix}`;
                let uniqueEmail = `${autobotData.email.split('@')[0]}${uniqueSuffix}@${autobotData.email.split('@')[1]}`;

                // Ensure the username is unique
                while (await db.Autobot.findOne({ where: { username: uniqueUsername } })) {
                    uniqueSuffix = `_${autobotCounter + 1}_${Math.random().toString(36).substring(7)}`;
                    uniqueUsername = `${autobotData.username}${uniqueSuffix}`;
                }

                // Ensure the email is unique
                while (await db.Autobot.findOne({ where: { email: uniqueEmail } })) {
                    uniqueSuffix = `_${autobotCounter + 1}_${Math.random().toString(36).substring(7)}`;
                    uniqueEmail = `${autobotData.email.split('@')[0]}${uniqueSuffix}@${autobotData.email.split('@')[1]}`;
                }

                console.log(`Name: ${uniqueName}, Email: ${uniqueEmail}, Username: ${uniqueUsername}`);

                // Create an Autobot in the database
                const autoBot = await db.Autobot.create({
                    name: uniqueName,
                    username: uniqueUsername,
                    email: uniqueEmail
                });

                // Emit the new Autobot count to clients
                autobotCounter++;
                io.emit('autobotCountUpdate', autobotCounter);

                // Fetch 10 posts for this Autobot with retry
                const { data: posts } = await fetchWithRetry(`https://jsonplaceholder.typicode.com/posts?userId=${autobotData.id}`);

                for (const postData of posts.slice(0, 10)) {
                    let uniquePostTitle = postData.title;
                    let isUnique = false;
                    while (!isUnique) {
                        const existingPost = await db.Post.findOne({ where: { title: uniquePostTitle } });
                        if (existingPost) {
                            uniquePostTitle = `${postData.title}${Math.random().toString(36).substring(7)}`;
                        } else {
                            isUnique = true;
                        }
                    }

                    // Insert each post into the Posts table
                    const post = await db.Post.create({
                        title: uniquePostTitle,
                        body: postData.body,
                        autobotId: autoBot.id
                    });

                    // Fetch comments for each post with retry
                    const { data: comments } = await fetchWithRetry(`https://jsonplaceholder.typicode.com/comments?postId=${postData.id}`);

                    // Duplicate comments if there are less than 10
                    const finalComments = [];
                    while (finalComments.length < 10) {
                        comments.forEach(comment => {
                            if (finalComments.length < 10) {
                                finalComments.push(comment);
                            }
                        });
                    }

                    for (const commentData of finalComments) {
                        console.log(`Post ID: ${post.id}, Comment: ${commentData.body}`);

                        await db.Comment.create({
                            body: commentData.body,
                            postId: post.id
                        });
                    }
                }
            }
        }

        console.log('500 unique Autobots created successfully.');
    } catch (error) {
        console.error('Error: unable to fetch AutobotData', error);
    }
};

module.exports = (io) => {
    // Cron job to run createAutoBotData every 1 hour
    const job = new CronJob('0 * * * *', () => {
        console.log('Running background process to create Autobots');
        createAutoBotData(io).catch(console.error);
    });

    // Start the cron job
    job.start();
};