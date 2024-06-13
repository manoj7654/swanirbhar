
const Course=require("../modal/courseModal")
const User=require("../modal/userModal")
const { validationResult } = require('express-validator');
const Lesson=require("../modal/lessonModal")


// for creating courese
const createCourse = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { title, description } = req.body;
    console.log(req.userId)
    try {
      const course = await Course.create({
        title,
        description,
        teacherId: req.userId, 
      });
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  // for getting all course
  const getAllCourses = async (req, res) => {
    try {
      const courses = await Course.findAll({
        include: [{ model: User, as: 'teacher' }],
      });
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  // for get course by id
  const getCourseById = async (req, res) => {
    const { id } = req.params;
   
    try {
      const course = await Course.findByPk(id, {
        include: [{ model: User, as: 'teacher' }, { model: Lesson }],
      });
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

// for update course
  const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      
      const course = await Course.findByPk(id);
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      if (course.teacherId !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      course.title = title || course.title;
      course.description = description || course.description;
      await course.save();
  
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

// for delete coures
  const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
      const course = await Course.findByPk(id);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      if (course.teacherId !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      await course.destroy();
      res.status(204).json("Course deleted successfully");
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  module.exports={createCourse,getAllCourses,getCourseById,updateCourse,deleteCourse}