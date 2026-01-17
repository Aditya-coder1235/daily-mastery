const express=require('express')
const { create, getById, getAll, updateById, deleteById, getByQuery } = require('../controllers/productController')
const router=express.Router()
const {authMiddleWare}=require('../middlewares/authMiddleWare')
const upload=require('../middlewares/upload')


router.post('/create',authMiddleWare,upload.single('image'),create)
router.get('/getById/:id',getById)
router.get('/getAll',getAll)
// router.get('/getByQuery',getByQuery)
router.put('/update/:id',updateById)
router.delete('/delete/:id',deleteById)

module.exports=router