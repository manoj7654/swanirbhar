const express = require('express');
const { authenticate } = require('../middleware/authenticate');

const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require('../controller/courseController');
const { createCourseValidation, updateCourseValidation } = require('../validators/courseValidator');
const { authorisation } = require('../middleware/authorize');

const courseRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: The course title
 *         description:
 *           type: string
 *           description: The description of the course
 *       example:
 *         title: course Title
 *         description: course description
 */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Add a new course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: course added successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 *     example:
 *         title: course Title
 *         description: course description
 */

courseRouter.post('/courses',authenticate,authorisation(['teacher']), createCourseValidation,createCourse);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all courses
 *       500:
 *         description: Server error
 */

courseRouter.get('/courses',authenticate,getAllCourses);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get course by id
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course id
 *     responses:
 *       200:
 *         description: Particular course
 *       500:
 *         description: Server error
 */

courseRouter.get('/courses/:id',authenticate,getCourseById);
/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
courseRouter.put('/courses/:id',authenticate,authorisation(['teacher']),updateCourseValidation,updateCourse);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course id
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */

courseRouter.delete('/courses/:id',authenticate,authorisation(['teacher']),deleteCourse);




module.exports={courseRouter}