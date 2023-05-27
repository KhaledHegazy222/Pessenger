const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: { type: String, default: "", maxLength: 30 },
  members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  messages: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
    default: [],
  },
});

module.exports = mongoose.model("Chat", chatSchema);
