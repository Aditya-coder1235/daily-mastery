const express=require('express')
const { createReview } = require('../controllers/reviewController')
const router=express.Router()
const {authMiddleWare}=require('../middlewares/authMiddleWare')

router.post('/create/:id',authMiddleWare,createReview)

module.exports=router