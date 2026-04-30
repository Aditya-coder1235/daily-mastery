const express=require('express');
const { startConversation } = require('../controllers/conversation.controller');
const protectRoute = require('../middleware/auth.middleware');
const router=express.Router()

router.post('/start/:id',protectRoute,startConversation)


module.exports=router