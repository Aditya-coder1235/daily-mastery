const User=require('../models/userSchema');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
require('dotenv').config()


exports.signup=async(req,res)=>{
    try {
        let {name,email,password,role}=req.body;

        let user=await User.findOne({email})
        if(user){
           return res.status(400).json({message:"user already exists"});
        }

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields required" });
        }


        let hashPassowrd=await bcrypt.hash(password,13);

        const newUser=new User({name,email,password:hashPassowrd,role});

        await newUser.save()

        res.status(200).json({message:"user signup successfully" , user:newUser})
        
    } catch (error) {
        res.status(400).json({message:"Error during signup"})
    }
}

exports.login=async(req,res)=>{
    try {
        let {email,password}=req.body;

        let user=await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        let isMatched=await bcrypt.compare(password,user.password)
        if(!isMatched){
            return res.status(400).json({message:"Invalid Password"});
        }

        const token=jwt.sign(
            {id:user.id,role:user.role,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,     
            sameSite: "lax",   
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        res.status(200).json({message:"user login successfully",token:token,user:user})

    } catch (error) {
        res.status(400).json({ message: "Error during login" })
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,   
            sameSite: "lax", 
            path: "/",       
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Logout failed" });
    }
};
