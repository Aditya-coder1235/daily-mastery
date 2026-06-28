const express = require("express");
const { isAuth } = require("../middlewares/isAuth");
const { startConversation } = require("../controllers/conversation.controller");
const router = express.Router()

router.post("/start/:id", isAuth, startConversation)

module.exports = router