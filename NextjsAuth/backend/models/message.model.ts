import mongoose from "mongoose";
import { IMessage } from "../types/allTypes";

const messageSchema = new mongoose.Schema<IMessage>(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        text: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
