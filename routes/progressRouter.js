const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const { getUserProgress, updateUserProgress } = require('../controller/progressController');
const { updateProgressValidation } = require('../validators/progressValidator');


const progressRouter = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Progress:
 *       type: object
 *       required:
 *         - courseId
 *         - progress
 *       properties:
 *         userId:
 *           type: integer
 *           description: The ID of the user
 *         courseId:
 *           type: integer
 *           description: The ID of the course
 *         progress:
 *           type: number
 *           description: The progress of the user in the course (0-100)
 *       example:
 *         courseId: 1
 *         progress: 50
 */

/**
 * @swagger
 * /users/{id}/progress:
 *   post:
 *     summary: Update user progress for a course
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - progress
 *             properties:
 *               courseId:
 *                 type: integer
 *                 description: The ID of the course
 *               progress:
 *                 type: number
 *                 description: The progress of the user in the course (0-100)
 *           examples:
 *             progressExample:
 *               summary: Example progress
 *               value:
 *                 courseId: 1
 *                 progress: 50
 *     responses:
 *       200:
 *         description: User progress updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Progress'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */


// Route to get progress for a specific user
progressRouter.get('/users/:id/progress',authenticate,getUserProgress);


/**
 * @swagger
 * /users/{id}/progress:
 *   get:
 *     summary: Get user progress for a course
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User progress retrieved successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: User progress not found
 *       500:
 *         description: Server error
 */



// Route to update progress for a specific user
progressRouter.post( '/users/:id/progress', authenticate, updateProgressValidation,updateUserProgress);

module.exports = {progressRouter};
