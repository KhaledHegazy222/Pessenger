const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: { type: String, minLength: 8 },
  chats: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Chat" }],
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
