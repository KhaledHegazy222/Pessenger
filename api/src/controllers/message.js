const Chat = require("../models/chat");
const Message = require("../models/message");

exports.sendMessage = async (req, res) => {
  try {
    const { chatID } = req.params;
    console.log(chatID);
    const { content } = req.body;
    const message = await Message.create({
      from: req.user._id,
      content: content,
    });
    const chat = await Chat.findOne({ _id: chatID });
    chat.messages.push(message._id);
    await chat.save();
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
  return res.sendStatus(200);
};