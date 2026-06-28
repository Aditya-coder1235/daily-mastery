const Conversation = require("../models/conversation.model");

const startConversation = async (req, res) => {
    try {
        let { id } = req.params;

        if(id===req.user.id){
            return res.status(400).json({message:"You cannot start conversation with you!"})
        }

        let existingConversation = await Conversation.findOne({
            members: { $all: [id, req.user.id] }
        });

        if (existingConversation) {
            return res.status(200).json(existingConversation)
        }

        let newConversation = new Conversation({
            members: [id, req.user.id]
        });

        await newConversation.save()

        res.status(201).json(newConversation)

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}


module.exports = { startConversation }