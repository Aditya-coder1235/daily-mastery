const express=require('express')
const router=express.Router()
const generateAi=require('../controller/aiController')

router.post("/generate", generateAi);

module.exports=router