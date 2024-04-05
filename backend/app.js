const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./utils/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const chatRoutes = require("./routes/chatRoutes");
const User = require('./modals/user');
const chat = require('./modals/chatModel');

const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Set CORS configuration
app.use(
  cors()
);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

User.hasMany(chat);
chat.belongsTo(User)

db.sync()
  .then(() => {
    console.log("Sequelize sync successful");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.error("Error syncing database:", error));
