const asyncHandler = require("express-async-handler");
const Group = require("../modals/group");
const { Op } = require('sequelize');


const createGroup = asyncHandler(async (req, res) => {
    // Assuming the authenticated user's ID is available in req.user
    console.log(req.body);
    const { groupName, users } = req.body;
    const adminId = req.loggedInUserId
  
    try {
      // Create a new group in the database
      const group = await Group.create({
        groupName,
        adminId,
        users,
        // Other properties can be added here as needed
      });
  
      res.status(201).json(group);
    } catch (error) {
      res.status(500).json({ message: 'Group creation failed', error: error.message });
    }
  });


  
const getGroup = asyncHandler(async (req, res) => {
    try {
        const groups = await Group.findAll();
        res.status(200).json(groups);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch groups", error: error.message });
      }
  });

  const getGroupById = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
  
    try {
      const group = await Group.findByPk(groupId);
      if (!group) {
        res.status(404).json({ message: "Group not found" });
        return;
      }
      res.status(200).json(group);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch group details", error: error.message });
    }
  });

  const changeGroupadmin = asyncHandler(async (req, res) => {
    const { groupId } = req.body;
    const { userId } = req.body;

    try {
        // Find the group by ID
        const group = await Group.findByPk(groupId);
        if (!group) {
            res.status(404).json({ message: "Group not found" });
            return;
        }

        // Update the adminId with the new user ID
        group.adminId = userId;

        // Save the changes
        await group.save();

        res.status(200).json({ message: "Admin updated successfully", group });
    } catch (error) {
        res.status(500).json({ message: "Failed to update admin", error: error.message });
    }
  });

module.exports = {createGroup, getGroup,getGroupById, changeGroupadmin}