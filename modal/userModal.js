const {  DataTypes } = require('sequelize');

// importing connection for defining users schema
const { connection } = require('../config/db');


    const User = connection.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          role: {
            type: DataTypes.ENUM('student', 'teacher'),
            allowNull: false,
          },
        
        }, {
          timestamps: true,
    });

    module.exports=User
 