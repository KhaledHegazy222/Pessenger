const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = process.env;

exports.verifyUser = (req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader && tokenHeader.split(" ")[1];
    if (tokenHeader == null) {
      return res.sendStatus(401); // Unauthorized
    }
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({ error: error.toString() });
  }
  next();
};
