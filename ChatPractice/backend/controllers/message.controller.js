const Message = require("../models/message.model");

exports.sendMessage = async (req, res) => {
    try {
        const { conversationId, text } = req.body;

        const newMessage = new Message({
            conversationId,
            text,
            sender: req.user.id
        });

        const savedMessage = await newMessage.save();

        const populatedMessage = await Message.findById(savedMessage._id)
            .populate({
                path: "conversationId",
                populate: {
                    path: "members",
                    select: "name email avatar"
                }
            });

        res.status(200).json(populatedMessage);

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getMessage = async (req, res) => {
    try {

        const { conversationId } = req.params;

        const populatedMessage = await Message.find({conversationId})
            .populate({
                path: "conversationId",
                populate: {
                    path: "members",
                    select: "name email avatar"
                }
            });

        res.status(200).json(populatedMessage);

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}