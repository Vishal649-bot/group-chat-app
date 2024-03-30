const express = require("express");
const {chats} = require("./data/data")
const cors = require("cors");

const db = require('./utils/db');

const dotenv = require("dotenv");

dotenv.config()

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("api is running");
  });



app.use('/api/user')

  db.sync()
  .then(() => {
    console.log('Sequelize sync successful');
    app.listen((process.env.PORT||3000), () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => console.error('Error syncing database:', error));