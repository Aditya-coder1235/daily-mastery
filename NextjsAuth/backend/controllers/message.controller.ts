import { Request, Response } from "express";
import Message from "../models/message.model";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { conversationId, text } = req.body;

        if (!conversationId || !text || !text.trim()) {
            return res.status(400).json({
                message: "Conversation and text are required",
            });
        }

        const newMessage = await Message.create({
            conversationId,
            sender: (req as any).user.id,
            text: text.trim(),
        });

        const populatedMessage = await Message.findById(newMessage._id)
            .populate({
                path: "sender",
                select: "name email",
            })
            .populate({
                path: "conversationId",
                populate: {
                    path: "members",
                    select: "name email",
                },
            });

        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const messages = await Message.find({
            conversationId: id,
        })
            .populate({
                path: "sender",
                select: "name email",
            })
            .sort({
                createdAt: 1,
            });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
