const { login, signup, logout } = require("../controllers/user");
const { verifyUser } = require("../middlewares");
const router = require("express").Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", verifyUser, logout);

const User = require("../models/user");
router.get("/", async (req, res) => {
  const usersList = await User.find({}, "_id email");
  return res.json(usersList);
});

module.exports = router;
