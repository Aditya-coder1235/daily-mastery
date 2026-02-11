const express=require('express')
const { addToCart, fetchCart, deleteFormCart, clearCart } = require('../controllers/cartController')
const router=express.Router()
const isAuth=require('../middlewares/authMiddleware')

router.post('/add',isAuth,addToCart)
router.get('/get', isAuth, fetchCart)
router.delete('/remove/:productId', isAuth, deleteFormCart)
router.delete('/clear', isAuth, clearCart)

module.exports=router