const express=require('express')
const User = require('../models/userModel')
const bcrypt=require('bcrypt')
const  jwt  = require('jsonwebtoken')
const auth=require('../middleware/authMiddle')

let router=express.Router()

router.get('/dashboard',auth,(req,res)=>{
    res.send("<h1>This is Dashboard</h1>")
})


router.post('/signup',async(req,res)=>{
    let {username,email,password}=req.body

    let user=await User.findOne({email})
    if(user){
        return res.status(409).json({message:"User already exist"});
    }

    const hashPassword=await bcrypt.hash(password,12)

    let newUser=new User({username,email,password:hashPassword})

    await newUser.save()

    res.status(201).json({message:"User registered!"})
})

router.post('/login',async(req,res)=>{
    let {username,email,password}=req.body;

    let user=await User.findOne({email})
    if(!user){
        return res.status(404).json({message:"User not found!"});
    }

    let match=await bcrypt.compare(password,user.password)
    if(!match){
        return res.status(401).json({message:"password incorect"})
    }

    let token=jwt.sign(
        {id:user._id,username:user.username},
        process.env.SECRET,
        {expiresIn:"1h"}
    )

    res.status(200).json({message:"User login successfully",token:token})
})

module.exports=router