const { Sequelize } = require('sequelize');
require("dotenv").config();

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize("group-chat-app", "root", "qwert@4321", {
  host: "localhost",
  dialect: 'mysql', // or any other dialect like 'mysql', 'sqlite', 'mssql', etc.
});

module.exports =  sequelize