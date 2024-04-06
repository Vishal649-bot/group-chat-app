const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db'); // Assuming this file contains your Sequelize instance

const Group = sequelize.define('Group', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // You may add more validations or constraints as needed
  },
  users: {
    type: DataTypes.JSON, // Storing users as JSON
    allowNull: false,
    defaultValue: [] // Default value as empty array
  },
  // Add more properties if needed
});

module.exports = Group;
