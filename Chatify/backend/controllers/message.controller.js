const Message = require("../models/message.model");


exports.sendMessage=async(req,res)=>{
    try {
        const {conversationId,text}=req.body;

        if(!conversationId || !text){
            return res.status(400).json({message:"All fields are required"});
        }

        const newMessage=new Message({conversationId,sender:req.user.id,text});

        await newMessage.save()

        const populatedMessage = await Message.findById(newMessage._id).populate({
            path: "conversationId",
            populate: {
                path: "members",
                select: "name email avatar"
            }
        });

        res.status(200).json(populatedMessage);
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

exports.getMessage = async (req, res) => {
    try {

        let { id } = req.params;

        let message = await Message.find({ conversationId: id }).populate({
            path: "conversationId",
            populate: {
                path: "members",
                select: "name email avatar"
            }
        });


        res.status(200).json(message)

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}