const { body } = require('express-validator');
const createLessonValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
];

const updateLessonValidation = [
  body('title').optional().notEmpty().withMessage('Title is required'),
  body('content').optional().notEmpty().withMessage('Content is required'),
];

module.exports={createLessonValidation,updateLessonValidation}