import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        totalAutobots: 0,
        autobotCount: 0,
        autobots: [],
        selectedAutobot: null,
        selectedPost: null,
        posts: [],
        comments: [],
        errorMessage: null
    },
    mutations: {
        setAutobots(state, autobots) {
            state.autobots = autobots;
        },
        setTotalAutobots(state, total) {
            state.totalAutobots = total;
        },
        setAutobotCount(state, count) {
            state.autobotCount = count;
        },
        setSelectedAutobot(state, autobot) {
            state.selectedAutobot = autobot;
        },
        setSelectedPost(state, post) {
            state.selectedPost = post
        },
        setPosts(state, posts) {
            state.posts = posts;
        },
        setComments(state, comments) {
            state.comments = comments;
        },
        setErrorMessage(state, message) {
            state.errorMessage = message;
        }
    },
    actions: {
        async updateAutobotCount({ commit }, count) {
            commit('setAutobotCount', count);
        },
        async fetchAutobots({ commit }, { page, limit }) {
            try {
                const response = await axios.get('http://localhost:3000/api/autobots', {
                    params: { page, limit }
                });
                const autobots = response.data?.data || [];
                const totalItems = response.data?.totalItems || 0;
                commit('setAutobots', autobots);
                commit('setTotalAutobots', totalItems);
            } catch (error) {
                const errorMessage = error.response?.data || 'Error fetching Autobots';
                if (error.response && error.response.status === 429) {
                    commit('setErrorMessage', errorMessage);
                    setTimeout(() => commit('setErrorMessage', null), 5000);
                } else {
                    console.error('Error fetching Autobots:', error);
                    commit('setErrorMessage', errorMessage);
                }
            }
        },
        async fetchPosts({ commit }, autobotId) {
            try {
                console.log(`Fetching posts for autobotId: ${autobotId}`);  // Debugging line
                const response = await axios.get(`http://localhost:3000/api/autobots/${autobotId}/posts`);
                console.log('Response:', response);
                const posts = response.data?.data || [];
                commit('setPosts', posts);
            } catch (error) {
                console.error('Full error: ', error);
                const errorMessage = error.response?.data || 'Error fetching Posts';
                if (error.response && error.response?.status === 429) {
                    commit('setErrorMessage', errorMessage);
                    setTimeout(() => commit('setErrorMessage', null), 5000);
                } else {
                    console.error('Error fetching Posts:', error.message);
                    commit('setErrorMessage', errorMessage);
                }
            }
        },
        async fetchComments({ commit }, postId) {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${postId}/comments`);
                commit('setComments', response.data.data || response.data);
            } catch (error) {
                const errorMessage = error.response?.data || 'Error fetching Comments';
                if (error.response && error.response.status === 429) {
                    commit('setErrorMessage', errorMessage);
                    setTimeout(() => commit('setErrorMessage', null), 5000);
                } else {
                    console.error('Error fetching Comments:', error);
                    commit('setErrorMessage', errorMessage);
                }
            }
        }
    },
    getters: {
        autobots: state => state.autobots,
        selectedAutobot: state => state.selectedAutobot,
        selectedPost: state => state.selectedPost,
        posts: state => state.posts,
        comments: state => state.comments,
        autobotCount: state => state.autobotCount,
        errorMessage: state => state.errorMessage,
        totalAutobots: state => state.totalAutobots
    }
});
