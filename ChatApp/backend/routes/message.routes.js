const express=require("express");
const { isAuth } = require("../middlewares/isAuth");
const { sendMessage, getMessage } = require("../controllers/message.controller");
const router=express.Router();

router.post("/send",isAuth,sendMessage)
router.get("/get/:conversationId", isAuth, getMessage)


module.exports=router