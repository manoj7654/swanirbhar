const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const { getAllLessons, getLessonById, createLesson, updateLesson, deleteLesson } = require('../controller/lessonController');
const { authorisation } = require('../middleware/authorize');
const { createLessonValidation, updateLessonValidation } = require('../validators/lessonValidatore');


const lessonRouter = express.Router();

lessonRouter.post('/courses/:courseId/lessons',authenticate,authorisation(['teacher']),createLessonValidation, createLesson);
lessonRouter.get('/courses/:courseId/lessons', authenticate,getAllLessons);

lessonRouter.get('/lessons/:id',authenticate,getLessonById);

lessonRouter.put('/lessons/:id',authenticate,authorisation(['teacher']),updateLessonValidation,updateLesson);

lessonRouter.delete('/lessons/:id',authenticate,authorisation(['teacher']),deleteLesson);

module.exports = {lessonRouter};
