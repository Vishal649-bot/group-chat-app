// modals/messageModel.js

const Sequelize = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./user'); // Assuming you have a User model

const Message = sequelize.define('message', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Message;
