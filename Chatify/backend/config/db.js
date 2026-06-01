const mongoose=require("mongoose");

const DBConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)

    } catch (error) {
        console.log(error);
    }
}

module.exports=DBConnect