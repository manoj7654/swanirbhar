const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const { getUserProgress, updateUserProgress } = require('../controller/progressController');
const { updateProgressValidation } = require('../validators/progressValidator');


const progressRouter = express.Router();

// Route to get progress for a specific user
progressRouter.get('/users/:id/progress',authenticate,getUserProgress);

// Route to update progress for a specific user
progressRouter.post( '/users/:id/progress', authenticate, updateProgressValidation,updateUserProgress);

module.exports = {progressRouter};
