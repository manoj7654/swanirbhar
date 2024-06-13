const { DataTypes } = require('sequelize');
const User = require('../modal/userModal');
const { connection } = require('../config/db');

const Course = connection.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  teacherId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
});

User.hasMany(Course, { foreignKey: 'teacherId' });
Course.belongsTo(User, { as: 'teacher', foreignKey: 'teacherId' });

module.exports = Course;
