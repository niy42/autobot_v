const express = require('express');
const router = express.Router();
const autobotController = require('../../controllers/autobotController');
const postController = require('../../controllers/postController');
const commentController = require('../../controllers/commentController');

// Swagger annotations

/**
 * @swagger
 * tags:
 *   name: Autobots
 *   description: API to manage Autobots.
 */

/**
 * @swagger
 * /api/autobots:
 *   get:
 *     summary: Retrieves a list of Autobots
 *     tags: [Autobots]
 *     responses:
 *       200:
 *         description: A list of Autobots.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 */
// GET /api/autobots
router.get('/autobots', autobotController.fetchingAutobots);

/**
 * @swagger
 * /api/autobots/{id}:
 *   get:
 *     summary: Retrieve a single Autobot by ID
 *     tags: [Autobots]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The Autobot ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: An Autobot object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Autobot not found
 */
// GET /api/autobots/:id
router.get('/autobots/:id', autobotController.fetchingAutobotsById);

/**
 * @swagger
 * /api/autobots/{id}/posts:
 *   get:
 *     summary: Retrieves posts for a specific Autobot
 *     tags: [Autobots]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The Autobot ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of posts for the specified Autobot.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   body:
 *                     type: string
 *                   autobotId:
 *                     type: integer
 *       404:
 *         description: Autobot not found
 */
// GET /api/autobots/:id/posts
router.get('/autobots/:id/posts', postController.fetchingPosts);

/**
 * @swagger
 * /api/posts/{id}/comments:
 *   get:
 *     summary: Retrieves comments for a specific post
 *     tags: [Autobots]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The post ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of comments for the specified post.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   body:
 *                     type: string
 *                   postId:
 *                     type: integer
 *       404:
 *         description: Post not found
 */
// GET /api/posts/:id/comments
router.get('/posts/:id/comments', commentController.fetchingComments);

module.exports = router;
