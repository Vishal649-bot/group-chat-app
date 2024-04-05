const asyncHandler = require("express-async-handler");
const Message = require("../modals/messageModel");
const { Op } = require('sequelize');

const sendmessage = asyncHandler(async (req, res) => {
    try {
        const {  message } = req.body;
        const userId = req.loggedInUserId
        console.log(userId);
        const newMessage = await Message.create({ userId, message });
        res.status(201).json(newMessage);
      } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
})


module.exports = {sendmessage}
