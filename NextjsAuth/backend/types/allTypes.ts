import mongoose from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface IMessage {
    conversationId: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    text: string;

    createdAt: Date;
    updatedAt: Date;
}