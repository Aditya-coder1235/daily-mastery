const jwt=require('jsonwebtoken')

const isAuth=async(req,res,next)=>{
    let token=req.cookies.token
    
    if(!token){
        return res.status(400).json({message:"Token not available"})
    }

    try {

        let decoded=jwt.verify(token,process.env.JWT_SECRET)

        req.user=decoded

        next()
        
    } catch (error) {
        res.status(400).json({ message: "Token not available" })
    }
}

module.exports=isAuth