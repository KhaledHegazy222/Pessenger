require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const cors = require("cors");

const corsOptions = {
  origin: "*", // Replace with the appropriate origin URL of your client-side app
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors());
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

const port = 3001;

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
