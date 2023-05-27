const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
  from: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
})

module.exports = mongoose.model("Message", messageSchema);
