const mongoose = require("mongoose");

const conversationScahem = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},{timestamps:true});

const Conversation=mongoose.model("Conversation",conversationScahem);

module.exports=Conversation