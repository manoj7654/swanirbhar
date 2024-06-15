const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const { getAllLessons, getLessonById, createLesson, updateLesson, deleteLesson } = require('../controller/lessonController');
const { authorisation } = require('../middleware/authorize');
const { createLessonValidation, updateLessonValidation } = require('../validators/lessonValidatore');


const lessonRouter = express.Router();



/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           content: The course title
 *         content:
 *           type: string
 *           content: The content of the course
 *       example:
 *         title: course Title
 *         content: course content
 */

/**
 * @swagger
 * /courses/{courseId}/lessons:
 *   post:
 *     summary: Add a new Lesson
 *     tags: [Lesson]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *           examples:
 *             lessonExample:
 *               summary: Example lesson
 *               value:
 *                 title: Lesson Title
 *                 description: Lesson description
 *     responses:
 *       201:
 *         description: Lesson added successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */



lessonRouter.post('/courses/:courseId/lessons',authenticate,authorisation(['teacher']),createLessonValidation, createLesson);

/**
 * @swagger
 * /courses/{courseId}/lessons:
 *   get:
 *     summary: Get lessons for a specific course
 *     tags: [Lesson]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *     responses:
 *       200:
 *         description: A list of lessons for the specified course
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lesson'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */


lessonRouter.get('/courses/:courseId/lessons', authenticate,getAllLessons);

/**
 * @swagger
 * /lessons/{id}:
 *   get:
 *     summary: Get lesson by id
 *     tags: [Lesson]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lesson id
 *     responses:
 *       200:
 *         description: Particular lesson
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lesson'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Lesson not found
 *       500:
 *         description: Server error
 */


lessonRouter.get('/lessons/:id',authenticate,getLessonById);

/**
 * @swagger
 * /lessons/{id}:
 *   put:
 *     summary: Update a lesson
 *     tags: [Lesson]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lesson id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *           examples:
 *             lessonExample:
 *               summary: Example lesson
 *               value:
 *                 title: Updated Lesson Title
 *                 description: Updated Lesson description
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Lesson not found
 *       500:
 *         description: Server error
 */


lessonRouter.put('/lessons/:id',authenticate,authorisation(['teacher']),updateLessonValidation,updateLesson);

/**
 * @swagger
 * /lessons/{id}:
 *   delete:
 *     summary: Delete a lesson
 *     tags: [Lesson]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lesson id
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *       404:
 *         description: Lesson not found
 *       500:
 *         description: Server error
 */


lessonRouter.delete('/lessons/:id',authenticate,authorisation(['teacher']),deleteLesson);

module.exports = {lessonRouter};
