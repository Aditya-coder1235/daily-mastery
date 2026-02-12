const express = require('express')
const { createProduct, getAllProduct, getProductById, getProductForUser, updateProduct, deleteProduct } = require('../controllers/productController')
const router = express.Router()
const isAuth=require('../middlewares/authMiddleware')
const upload=require('../middlewares/imgMiddleware')

router.post('/create',isAuth,upload.single("image"), createProduct)
router.get('/getAll', getAllProduct)
router.get('/getById/:id', getProductById)
router.get('/getForSeller',isAuth, getProductForUser)
router.put('/update/:id', isAuth, upload.single("image"), updateProduct)
router.delete('/delete/:id', deleteProduct)

module.exports = router