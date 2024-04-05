const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { sendmessage } = require("../controllers/chatControllers");


const router = express.Router();


router.post('/',protect,sendmessage)

module.exports = router;