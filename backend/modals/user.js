const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const User = sequelize.define("user signup", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING, // Ensure 'password' is correctly defined
    allowNull: false,
  },
  pic: {
    type: DataTypes.STRING,
    defaultValue: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  phoneNumber: {
    type: DataTypes.STRING
    // You can add more constraints or validations here if needed
  }
});

module.exports = User;