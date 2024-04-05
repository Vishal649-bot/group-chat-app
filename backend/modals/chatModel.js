const { DataTypes } = require('sequelize');
const sequelize = require("../utils/db");
// const User = require('./modals/user');
 // Assuming you have Sequelize initialized and configured
 
const Chat = sequelize.define('Chat', {
  chatName: {
    type: DataTypes.STRING,
    allowNull: true,
    trim: true
  },
  isGroupChat: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  users: {
    type: DataTypes.JSON,
    allowNull: true
  },
  latestMessage: {
    type: DataTypes.JSON,
    allowNull: true
  },
  groupAdmin: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'user signups', // Assuming your User model is named 'User'
      key: 'id'
    }
  }
}, {
  timestamps: true,
  modelName: 'Chat'
});

module.exports = Chat;
