const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const { authorisation } = require('../middleware/authorize');

const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require('../controller/courseController');
const { createCourseValidation, updateCourseValidation } = require('../validators/courseValidator');

const courseRouter = express.Router();

courseRouter.post('/courses',authenticate,authorisation(['teacher']), createCourseValidation,createCourse);
courseRouter.get('/courses',authenticate,getAllCourses);
courseRouter.get('/courses/:id',authenticate,getCourseById);
courseRouter.put('/courses/:id',authenticate,authorisation(['teacher']),updateCourseValidation,updateCourse);
courseRouter.delete('/courses/:id',authenticate,authorisation(['teacher']),deleteCourse);




module.exports={courseRouter}