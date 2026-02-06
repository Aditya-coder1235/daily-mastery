const express=require('express')
const { createProduct, getAllProduct, getById, updateProduct, deleteProduct, getProductByUserId } = require('../controllers/productController')
const router=express.Router()
const isAuth=require('../middleware/authMiddleware')

router.post('/create',isAuth,createProduct)
router.get('/getAll',getAllProduct)
router.get('/getById/:id',getById)
router.get('/getByUserId', isAuth, getProductByUserId)
router.put('/update/:id',updateProduct)
router.delete('/delete/:id',deleteProduct)

module.exports=router