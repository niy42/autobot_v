const { db } = require('../models');
const { Comment } = db;

module.exports = {
    async fetchingComments(req, res) {
        try {
            const postId = parseInt(req.params.id, 10);
            const { page, limit } = req.query;

            // Validate input
            if (isNaN(postId) || postId < 1) {
                return res.status(400).json({ error: 'Invalid Post ID' });
            }

            // Pagination parameters
            const currentPage = parseInt(page, 10) || 1; // Defaults to page 1
            const pageSize = parseInt(limit, 10) || 10; // Defaults to 10 comments per page

            // Ensure pagination parameters are positive integers
            if (currentPage < 1 || pageSize < 1) {
                return res.status(400).json({ error: 'Page and limit must be positive integers' });
            }

            const offset = (currentPage - 1) * pageSize;

            // Fetch comments for the specified Post ID with pagination
            const { count, rows } = await Comment.findAndCountAll({
                where: { postId: postId },
                limit: pageSize,
                offset: offset
            });

            // Respond with paginated data
            res.json({
                totalItems: count,
                totalPages: Math.ceil(count / pageSize),
                currentPage: currentPage,
                data: rows,
            });
        } catch (error) {
            console.error(`Error fetching comments for Post ID ${req.params.id}: ${error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
