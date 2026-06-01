const Conversation = require("../models/conversation.model");


exports.startConversation = async (req, res) => {
    try {
        const { id } = req.params;

        const existingConversation = await Conversation.findOne({ members: { $all: [id, req.user.id] } });

        if (existingConversation) {
            return res.status(200).json(existingConversation);
        }

        const newConversation = new Conversation({ members: [id, req.user.id] });

        await newConversation.save()

        res.status(201).json(newConversation)

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}