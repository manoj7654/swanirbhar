const { body } = require('express-validator');

const createCourseValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
];

const updateCourseValidation = [
  body('title').optional().notEmpty().withMessage('Title is required'),
  body('description').optional().notEmpty().withMessage('Description is required'),
];

module.exports={createCourseValidation,updateCourseValidation}