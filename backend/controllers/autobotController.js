const { db } = require('../models');
const { Autobot } = db;

module.exports = {
    // Function to fetch Autobots with pagination
    async fetchingAutobots(req, res) {
        try {
            // Extract pagination parameters from query
            let { page, limit } = req.query;
            page = parseInt(page, 10) || 1; // Defaults to page 1
            limit = parseInt(limit, 10) || 10; // Defaults to 10 items per page

            // Validate that page and limit are positive integers
            if (page < 1 || limit < 1) {
                return res.status(400).json({ error: 'Page and limit must be positive integers' });
            }

            // Calculate the offset for the database query
            const offset = (page - 1) * limit;

            // Fetch Autobots from the database with pagination
            console.log("Fetching Autobots with limit:", limit, "and offset:", offset);
            const { count, rows } = await Autobot.findAndCountAll({
                limit: limit,
                offset: offset
            });
            console.log("Successfully fetched Autobots data.");

            // Respond with the paginated data
            res.json({
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                data: rows,
            });
        } catch (error) {
            console.error(`Error fetching Autobots: ${error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Function to fetch a single Autobot by ID
    async fetchingAutobotsById(req, res) {
        try {
            const { id } = req.params;
            const autobot = await Autobot.findByPk(id);

            // Check if the Autobot exists
            if (!autobot) {
                return res.status(404).json({ error: 'Autobot not found' });
            }

            // Respond with the Autobot data
            res.json(autobot);
        } catch (error) {
            console.error(`Error fetching Autobot by ID: ${error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
