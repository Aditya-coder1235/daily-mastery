const Message = require("../models/message.model");


const sendMessage=async(req,res)=>{
    try {
        let { conversationId,text}=req.body;

        let newMessage=new Message({
            conversationId,
            text,
            sender:req.user.id
        })

        await newMessage.save()

        let populatedMessage = await Message.findById(newMessage._id).populate({
            path: "conversationId",
            populate: {
                path: "members",
                select: "name email"
            }
        });

        res.status(200).json(populatedMessage)
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

const getMessage = async (req, res) => {
    try {
        let { conversationId } = req.params;

        let populatedMessage = await Message.find({conversationId}).populate({
            path: "conversationId",
            populate: {
                path: "members",
                select: "name email"
            }
        });

        res.status(200).json(populatedMessage)

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports={sendMessage,getMessage}