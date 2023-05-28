require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");

app.use("/api/account", userRouter);
app.use("/api/chats", chatRouter);

module.exports = app;
