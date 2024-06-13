const { DataTypes } = require('sequelize');
const {connection} = require('../config/db');
const User = require('../modal/userModal');
const Course = require('../modal/courseModal');

const Progress = connection.define('Progress', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
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
  progress: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    },
  },
}, {
  timestamps: true,
});

Progress.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Progress, { foreignKey: 'courseId' });

module.exports = Progress;
