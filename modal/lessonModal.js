const { DataTypes } = require('sequelize');
const {connection} = require('../config/db');
const Course = require('../modal/courseModal');

const Lesson = connection.define('Lesson', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
});

Course.hasMany(Lesson, { foreignKey: 'courseId' });
Lesson.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = Lesson;
