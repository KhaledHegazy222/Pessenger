const { sendMessage } = require("../controllers/message");

const router = require("express").Router();

router.post("/:chatID/messages/new", sendMessage);

module.exports = router;
