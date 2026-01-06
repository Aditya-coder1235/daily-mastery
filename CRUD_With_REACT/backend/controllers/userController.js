const User=require('../model/user');


exports.createUser=async(req,res)=>{
    let {name,email,password} =req.body
    try{
        let newUser=new User({name,email,password})

        let user=await newUser.save()

        res.status(200).json({message:"User create successfully",data:user});

    }catch(err){
        console.error(err)
    }
}

exports.fetchAllUsers=async(req,res)=>{
    try{
        let allUsers=await User.find({})

        res.status(200).json({message:"All user fetched",data:allUsers})

    }catch(err){
        console.error(err)
    }
}

exports.fetchUserById=async(req,res)=>{
    let {id} =req.params
    try {

        let user=await User.findById(id)

        res.status(200).json({message:"User fetch successfully",data:user})
        
    } catch (error) {
        console.error(error)
    }
}

exports.updateUserById=async(req,res)=>{
    let {id}=req.params
    let {name,email,password}=req.body;
    try {

        let updatedUser=await User.findByIdAndUpdate(id,{name,email,password})

        res.status(200).json({message:"User update successfully",data:updatedUser})
        
    } catch (error) {
        console.error(error)
    }
}

exports.deleteUserById=async(req,res)=>{
    let {id}=req.params
    try {

        let deletesUser=await User.findByIdAndDelete(id)

        res.status(200).json({message:"Delete User Successfully",data:deletesUser});
        
    } catch (error) {
        console.error(error)
    }
}