const jwt = require("jsonwebtoken");
const User = require("../modals/user.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //decodes token id
      const decoded = jwt.verify(token, "vishal");
      req.loggedInUserId = decoded.id;

      req.user =  await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] } // Exclude the password field
      });
      

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }


});

module.exports = { protect };