const User = require("../models/user");
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = process.env;

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user === null || user.password !== password) {
    return res.status(400).json({ error: "wrong email or password" });
  }

  const token = jwt.sign(user.toObject(), ACCESS_TOKEN_SECRET);
  return res.json({ token });
};

exports.signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user !== null) {
    res.status(400).json({ error: "this email has been already register" });
  }

  user = await User.create({ first_name, last_name, email, password });

  const token = jwt.sign(user.toObject(), ACCESS_TOKEN_SECRET);
  return res.json({ token });
};

exports.logout = async (req, res) => {
  res.sendStatus(200);
};
