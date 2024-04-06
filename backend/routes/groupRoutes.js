const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { createGroup,getGroup, getGroupById  } = require("../controllers/groupController");


const router = express.Router();


router.post('/',protect,createGroup)
router.get('/',getGroup)
router.get("/:groupId", getGroupById); // New route to get group by ID


module.exports = router;