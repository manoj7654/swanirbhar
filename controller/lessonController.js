const Lesson = require('../modal/lessonModal');
const Course = require('../modal/courseModal');
const { validationResult } = require('express-validator');



const createLesson = async (req, res) => {
  const { courseId } = req.params;
  const { title, content } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (course.teacherId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const lesson = await Lesson.create({
      title,
      content,
      courseId,
    });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Get all lessons for a specific course
const getAllLessons = async (req, res) => {
    const { courseId } = req.params;
    try {
      const lessons = await Lesson.findAll({ where: { courseId } });
      if (!lessons) {
        return res.status(404).json({ error: 'Lessons not found' });
      }
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Get a specific lesson by ID
  const getLessonById = async (req, res) => {
    const { id } = req.params;
    try {
      const lesson = await Lesson.findByPk(id);
      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
// Update a lesson 
const updateLesson = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const lesson = await Lesson.findByPk(id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const course = await Course.findByPk(lesson.courseId);
    if (course.teacherId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    lesson.title = title || lesson.title;
    lesson.content = content || lesson.content;
    await lesson.save();

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a lesson 
const deleteLesson = async (req, res) => {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findByPk(id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const course = await Course.findByPk(lesson.courseId);
    if (course.teacherId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await lesson.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports={createLesson,getAllLessons,getLessonById,updateLesson,deleteLesson}