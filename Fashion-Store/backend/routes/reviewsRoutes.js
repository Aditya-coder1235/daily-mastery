const express = require('express')
const { createReview, getAllReviews, deleteReviewByUserId } = require('../controllers/reviewsController')
const router = express.Router()
const isAuth=require('../middlewares/authMiddleware')

router.post('/create',isAuth,createReview);
router.get('/getAll/:id',getAllReviews)
router.delete('/delete/:reviewId',deleteReviewByUserId)


module.exports = router