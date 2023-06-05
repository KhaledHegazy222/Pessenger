require("dotenv").config();
require("./config/database").connect();

const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

const cors = require("cors");
const corsOptions = {
  origin: "*", // All any origin
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
app.use("/api/account", userRouter);
app.use("/api/chats", chatRouter);

const socketIo = require("socket.io");
const io = socketIo(server);

// Socket.io configuration
const socketHandler = require("./sockets");
const { verifySocket } = require("./middlewares");
io.use(verifySocket);
io.on("connection", socketHandler);

// server listening
const port = 8000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
