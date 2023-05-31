const connectedUsers = new Map();
const { getChat, getUser } = require("../controllers/chat");
const socketHandler = (socket) => {
  console.log("New Client");
  connectedUsers.set(socket.user._id, socket);

  socket.on("chats", async (data) => {
    const { chatID, refresh } = data;

    console.log(refresh);
    const chat = await getChat(chatID);
    const members = chat.members.map((member) => member._id.toString());

    members.forEach(async (member) => {
      const memberSocket = connectedUsers.get(member);
      if (memberSocket && (refresh || member !== socket.user._id)) {
        console.log("Sending");
        const user = await getUser(member);
        memberSocket.emit("chats", { chats: user.chats });
      }
    });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    connectedUsers.clear(socket.user._id);
  });
};

module.exports = socketHandler;
