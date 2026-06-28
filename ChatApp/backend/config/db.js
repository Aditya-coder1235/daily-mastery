const mongoose=require("mongoose");

const DBConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
    } catch (error) {
        console.log(error);
    }
}

module.exports=DBConnection