const Progress = require('../modal/progressModal');
const Course = require('../modal/courseModal');
const User = require('../modal/userModal');
const { validationResult } = require('express-validator');

// Get progress for a specific user
const getUserProgress = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const progress = await Progress.findAll({
      where: { userId: id },
      include: [{ model: Course }],
    });

    if (!progress) {
      return res.status(404).json({ error: 'Progress not found' });
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update progress for a specific user
const updateUserProgress = async (req, res) => {
  const { id } = req.params;

  const { courseId, progress } = req.body;
  console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let userProgress = await Progress.findOne({
      where: { userId: id, courseId: courseId },
    });

    if (!userProgress) {
      userProgress = await Progress.create({
        userId: id,
        courseId: courseId,
        progress: progress,
      });
    } else {
      userProgress.progress = progress;
      await userProgress.save();
    }

    res.json(userProgress);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports={getUserProgress,updateUserProgress}