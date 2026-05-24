import Conversation from "../models/conversation.model";
import {Request,Response} from "express"

export const startConversation=async(req:Request,res:Response)=>{
    try {
        const {senderId,receiverId}=req.body;
        const conversation=await Conversation.findOne({
            members:{$all:[senderId,receiverId]}
        })
        if(conversation){
            return res.status(200).json(conversation);
        }
        const newConversation=new Conversation({
            members:[senderId,receiverId]
        })
        const savedConversation=await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
}