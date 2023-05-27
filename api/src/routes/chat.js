const router = require("express").Router();

const { getAllChats, createChat, joinChat } = require("../controllers/chat");
const { verifyUser } = require("../middlewares");

const messageRouter = require("./message");

router.use(verifyUser);

router.get("/", getAllChats);
router.post("/new", createChat);
router.post("/:chatID/join", joinChat);

router.use(messageRouter);

module.exports = router;
