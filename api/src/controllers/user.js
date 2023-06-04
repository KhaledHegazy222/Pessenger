const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.CLIENT_ID);

const { ACCESS_TOKEN_SECRET } = process.env;

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user === null || user.password !== password) {
    console.log("What")
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
  try {
    user = await User.create({ first_name, last_name, email, password });

    const token = jwt.sign(user.toObject(), ACCESS_TOKEN_SECRET);
    return res.json({ token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  res.sendStatus(200);
};

exports.getLoggedIn = (req, res) => {
  res.status(200).json(req.user);
};

exports.continueWithGoogle = async (req, res) => {
  const googleToken = req.headers.authorization;
  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload.email;
    const first_name = payload.given_name;
    const last_name = payload.family_name;
    let user = await User.findOne({ email });

    if (user === null) {
      user = await User.create({ first_name, last_name, email });
    }

    const token = jwt.sign(user.toObject(), ACCESS_TOKEN_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};
