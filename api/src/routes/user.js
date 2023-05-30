const {
  login,
  signup,
  logout,
  getLoggedIn,
  continueWithGoogle,
} = require("../controllers/user");
const { verifyUser } = require("../middlewares");
const router = require("express").Router();

router.post("/login", login);
router.post("/google-login", continueWithGoogle);
router.post("/signup", signup);
router.post("/logout", verifyUser, logout);

const User = require("../models/user");
router.get("/", async (req, res) => {
  const usersList = await User.find({}, "_id email");
  return res.json(usersList);
});

router.get("/user", verifyUser, getLoggedIn);

module.exports = router;
