const express = require('express')
const { createProduct, getAllProduct, getProductById, getProductForUser, updateProduct, deleteProduct } = require('../controllers/productController')
const router = express.Router()
const isAuth=require('../middlewares/authMiddleware')

router.post('/create',isAuth, createProduct)
router.get('/getAll', getAllProduct)
router.get('/getById/:id', getProductById)
router.get('/getForSeller/:userId', getProductForUser)
router.put('/update/:id', updateProduct)
router.delete('/delete/:id', deleteProduct)

module.exports = router