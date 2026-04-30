import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const Message = () => {
    const [messages, setMessages] = useState([]);

    const [text, setText] = useState("");
    const { conversationId } = useParams();

    const userId = localStorage.getItem("id");

    const sendMessage = async () => {
        try {
            let res = await axios.post(
                "http://localhost:8080/api/message/send",
                { conversationId, text },
                { withCredentials: true },
            );

            let receiver = res.data.conversationId.members.find(
                (user) => user._id !== userId,
            );

            const reciverId = receiver._id;

            socket.emit("send", { userId, reciverId, text });

            console.log();

            setMessages((prev) => [...prev, res.data]);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    useEffect(() => {
        const getMessages = async () => {
            try {
                let res = await axios.get(
                    `http://localhost:8080/api/message/get/${conversationId}`,
                    { withCredentials: true },
                );

                setMessages(res.data);

                console.log(res.data);
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        };

        getMessages();
    }, [conversationId]);

    useEffect(() => {
        socket.emit("add user", { userId });

        socket.on("get msg", (data) => {
            setMessages((prev) => [
                ...prev,
                {
                    sender: data.senderId,
                    text: data.text,
                },
            ]);
        });

        return () => {
            socket.off("get msg");
        };
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
                {messages.map((msg, index) => {
                    const isMe = msg.sender === userId;

                    return (
                        <div
                            key={index}
                            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow
                ${isMe ? "bg-green-500 text-white" : "bg-white text-gray-800"}`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 flex gap-2">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 text-black border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <button
                    onClick={() => sendMessage()}
                    className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Message;
