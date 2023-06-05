const User = require("../models/user");
const Chat = require("../models/chat");

exports.getChat = async (chatID) => {
  return Chat.findOne({ _id: chatID }).populate("members messages");
};
exports.getUser = async (userID) => {
  const user = await User.findOne({ _id: userID }).populate({
    path: "chats",
    populate: {
      path: "messages",
      populate: {
        path: "from",
      },
    },
  });
  return user;
};
exports.getAllChats = async (req, res) => {
  const user = await this.getUser(req.user._id);

  return res.status(200).json({ chats: user.chats });
};

exports.createChat = async (req, res) => {
  let chat;
  try {
    const { name, members } = req.body;
    members.push(req.user._id);
    chat = await Chat.create({ name, members });
    members.forEach(async (member) => {
      const user = await User.findOne({ _id: member });
      user.chats.push(chat._id);
      await user.save();
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json({ chat: { _id: chat._id } });
};

exports.joinChat = async (req, res) => {
  try {
    const { chatID } = req.params;

    const user = await User.findOne({ _id: req.user._id });
    const chat = await Chat.findOne({ _id: chatID });

    user.chats.push(chat._id);
    await user.save();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.sendStatus(200);
};
