const User = require("../models/user");
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

router.get("/", async (req, res) => {
  const usersList = await User.find({}, "_id email first_name last_name");
  return res.json(usersList);
});

router.get("/user", verifyUser, getLoggedIn);

module.exports = router;
