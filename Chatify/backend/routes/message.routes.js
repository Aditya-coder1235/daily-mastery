const express=require("express");
const { sendMessage, getMessage } = require("../controllers/message.controller");
const { isAuth } = require("../middleware/isAuth");
const router=express.Router();

router.post("/send",isAuth,sendMessage);
router.get("/get/:id",getMessage)

module.exports=router