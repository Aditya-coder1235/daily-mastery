const express=require('express');
const { sendMessage, getMessage } = require('../controllers/message.controller');
const protectRoute = require('../middleware/auth.middleware');
const router=express.Router()

router.post('/send',protectRoute,sendMessage)
router.get('/get/:conversationId', protectRoute, getMessage)


module.exports=router