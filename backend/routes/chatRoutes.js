const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { sendmessage,getmessage } = require("../controllers/chatControllers");


const router = express.Router();


router.post('/',protect,sendmessage)
router.get('/',getmessage)

module.exports = router;