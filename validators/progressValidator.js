const { body } = require('express-validator');

const updateProgressValidation = [
  body('courseId').notEmpty().withMessage('Course ID is required'),
  body('progress').isFloat({ min: 0, max: 100 }).withMessage('Progress must be a value between 0 and 100'),
];

module.exports={updateProgressValidation}