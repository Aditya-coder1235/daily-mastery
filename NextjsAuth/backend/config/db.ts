import mongoose from "mongoose"

export async function ConnectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        
    } catch (error) {
        console.log(error);
    }
}