const express=require("express");
const { startConversation } = require("../controllers/conversation.controller");
const { isAuth } = require("../middleware/isAuth");
const router=express.Router()

router.post("/start/:id",isAuth,startConversation)

module.exports=router