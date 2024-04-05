const asyncHandler = require("express-async-handler");
const User = require("../modals/user");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await User.findOne({
        where: {
          email: email,
        },
      });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        pic: pic,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });
  
  //login
  const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      console.log("Invalid email .");
      return res.status(400).json({ error: "Invalid email " });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("Invalid  password.");
      return res.status(400).json({ error: "Invalid  password." });
    }

    if (user) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user.id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });
  
  const allUsers = asyncHandler(async (req, res) => {
    try {
      const users = await User.findAll({
        where: {
          id: { [Op.ne]: req.loggedInUserId } // Exclude the logged-in user
        },
        attributes: { exclude: ['password'] } // Exclude the password field
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports = {  registerUser,authUser, allUsers   };

