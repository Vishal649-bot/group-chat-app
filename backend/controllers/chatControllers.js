const asyncHandler = require("express-async-handler");
const Chat = require("../modals/chatModel");
const User = require("../modals/user");
const { Op } = require('sequelize');



const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    console.log(userId);
console.log(req.user.id);
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    try {
        // // Check if a chat exists between the current user and the specified user
        // const isChat = await Chat.findOne({
        //     where: {
        //         isGroupChat: false,
        //         [Op.and]: [
        //             { '$users.id$': req.user.id },
        //             { '$users.id$': userId }
        //         ]
        //     },
        //     include: [
        //         { model: User, attributes: { exclude: ['password'] }, as: 'users' },
        //         { model: Message, as: 'latestMessage', include: [{ model: User, as: 'sender', attributes: ['name', 'pic', 'email'] }] }
        //     ]
        // });

        // if (isChat) {
        //     // If chat exists, send the chat data
        //     res.send(isChat);
        // } 
        // else {
            // If chat doesn't exist, create a new chat
            const user = await User.findOne({
                where: {
                    id: userId,
                  },
            })

            const createdChat = await Chat.create({
                chatName: "sender",
                isGroupChat: false,
                users: [user] // Include users directly in the creation
            });

            // No need to add users separately now

            // Retrieve the newly created chat with populated user data
            const fullChat = await Chat.findByPk(createdChat.id, {
                include: { model: User, attributes: { exclude: ['password'] }, as: 'users' }
            });

            res.status(200).json(fullChat);
        // }
    } catch (error) {
        console.error('Error accessing chat:', error);
        res.status(400).send(error.message);
    }
});

  module.exports = {
    accessChat,
    // fetchChats,
    // createGroupChat,
    // renameGroup,
    // addToGroup,
    // removeFromGroup,
  };