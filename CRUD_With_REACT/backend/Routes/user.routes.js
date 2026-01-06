const express=require('express')
const { createUser, fetchAllUsers, fetchUserById, updateUserById, deleteUserById } = require('../controllers/userController')
const router=express.Router()

router.post('/create',createUser)
router.get('/AllUser',fetchAllUsers)
router.get('/getUserById/:id',fetchUserById)
router.put('/update/:id',updateUserById)
router.delete('/delete/:id',deleteUserById)

module.exports=router