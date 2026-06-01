import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080", {
    withCredentials: true,
});

const Message = () => {
    const { id } = useParams();
    const userId = localStorage.getItem("userId");

    const [messages, setMessages] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState("");

    const sendMessage = async () => {
        if (!inputValue.trim()) return;

        try {
            const response = await axios.post(
                "http://localhost:8080/api/message/send",
                {
                    conversationId: id,
                    text: inputValue,
                },
                {
                    withCredentials: true,
                },
            );
            console.log("Message sent:", response.data.conversationId.members);

            const receiver = response.data.conversationId.members.find(
                (member) => member._id !== userId,
            );

            const receiverId = receiver._id;

            setMessages((prev) => [...prev, response.data]);
            setInputValue("");
            socket.emit("sendMessage", {
                conversationId: id,
                receiverId,
                senderId: userId,
                text: inputValue,
            });
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/message/get/${id}`,
                {
                    withCredentials: true,
                },
            );
            setMessages(response.data);
        } catch (err) {
            console.error("Error fetching messages:", err);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage();
    };

    useEffect(() => {
        fetchMessages();

        socket.emit("addUser", userId);

        const handleMessage = (data) => {
            if (data.conversationId === id) {
                setMessages((prev) => [...prev, data]);
            }
        };

        socket.on("getMessage", handleMessage);

        return () => {
            socket.off("getMessage", handleMessage);
        };
    }, [id, userId]);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="bg-white border-b border-gray-300 p-4 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`flex ${
                            msg.sender === userId
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                                msg.sender === userId
                                    ? "bg-blue-500 text-white rounded-br-none"
                                    : "bg-gray-300 text-gray-900 rounded-bl-none"
                            }`}
                        >
                            <p>{msg.text}</p>

                            <p
                                className={`text-xs mt-1 ${
                                    msg.sender === userId
                                        ? "text-blue-100"
                                        : "text-gray-600"
                                }`}
                            >
                                {msg.createdAt
                                    ? new Date(
                                          msg.createdAt,
                                      ).toLocaleTimeString()
                                    : ""}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white border-t border-gray-300 p-4 flex gap-2"
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition font-semibold"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Message;
