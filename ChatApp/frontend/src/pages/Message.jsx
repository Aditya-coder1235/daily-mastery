import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080", {
    withCredentials: true,
});

const Message = () => {
    const { id } = useParams();
    const userId = localStorage.getItem("userId");

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        try {
            const res = await axios.post(
                "http://localhost:8080/api/message/send",
                { conversationId: id, text: input },
                { withCredentials: true },
            );

            socket.emit("send", {
                senderId: userId,
                receiverId: res.data.receiverId,
                text: input,
                conversationId: id,
            });

            setMessages((prev) => [...prev, res.data]);
            setInput("");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const getMessages = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/message/get/${id}`,
                { withCredentials: true },
            );
            setMessages(res.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        getMessages();
    }, [id]);

    useEffect(() => {
        if (userId) {
            socket.emit("add user", userId);
        }

        socket.on("get", ({ senderId, text, conversationId }) => {
            if (conversationId === id) {
                setMessages((prev) => [
                    ...prev,
                    { _id: Date.now().toString(), sender: senderId, text },
                ]);
            }
        });

        return () => {
            socket.off("get");
        };
    }, [userId, id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTime = () => {
        return new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                background: "#0f0f1a",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                color: "#e2e8f0",
            }}
        >
            <div
                style={{
                    background: "#1a1a2e",
                    borderBottom: "1px solid #2d2d4e",
                    padding: "16px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                }}
            >
                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#fff",
                        flexShrink: 0,
                    }}
                >
                    C
                </div>
                <div>
                    <div
                        style={{
                            fontWeight: "600",
                            fontSize: "15px",
                            color: "#f1f5f9",
                        }}
                    >
                        Chat
                    </div>
                    <div style={{ fontSize: "12px", color: "#6366f1" }}>
                        ● Online
                    </div>
                </div>
            </div>

            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "20px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#2d2d4e transparent",
                }}
            >
                {messages.length === 0 && (
                    <div
                        style={{
                            textAlign: "center",
                            color: "#4a4a6a",
                            marginTop: "80px",
                            fontSize: "14px",
                        }}
                    >
                        No messages yet. Say hello! 👋
                    </div>
                )}

                {messages.map((msg) => {
                    const isMine = msg.sender === userId;
                    return (
                        <div
                            key={msg._id}
                            style={{
                                display: "flex",
                                justifyContent: isMine
                                    ? "flex-end"
                                    : "flex-start",
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: "68%",
                                    padding: "10px 14px",
                                    borderRadius: isMine
                                        ? "18px 18px 4px 18px"
                                        : "18px 18px 18px 4px",
                                    background: isMine
                                        ? "linear-gradient(135deg, #6366f1, #7c3aed)"
                                        : "#1e1e35",
                                    color: isMine ? "#fff" : "#cbd5e1",
                                    fontSize: "14px",
                                    lineHeight: "1.5",
                                    boxShadow: isMine
                                        ? "0 2px 12px rgba(99,102,241,0.35)"
                                        : "0 2px 8px rgba(0,0,0,0.3)",
                                    border: isMine
                                        ? "none"
                                        : "1px solid #2d2d4e",
                                }}
                            >
                                <div>{msg.text}</div>
                                <div
                                    style={{
                                        fontSize: "10px",
                                        marginTop: "4px",
                                        opacity: 0.6,
                                        textAlign: "right",
                                    }}
                                >
                                    {formatTime()}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            <div
                style={{
                    background: "#1a1a2e",
                    borderTop: "1px solid #2d2d4e",
                    padding: "14px 16px",
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                }}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    style={{
                        flex: 1,
                        background: "#0f0f1a",
                        border: "1px solid #2d2d4e",
                        borderRadius: "24px",
                        padding: "12px 18px",
                        color: "#e2e8f0",
                        fontSize: "14px",
                        outline: "none",
                        transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                    onBlur={(e) => (e.target.style.borderColor = "#2d2d4e")}
                />
                <button
                    onClick={sendMessage}
                    style={{
                        background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                        border: "none",
                        borderRadius: "50%",
                        width: "44px",
                        height: "44px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                        boxShadow: "0 2px 12px rgba(99,102,241,0.4)",
                        transition: "transform 0.1s, box-shadow 0.1s",
                    }}
                    onMouseDown={(e) =>
                        (e.currentTarget.style.transform = "scale(0.93)")
                    }
                    onMouseUp={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                    }
                    title="Send"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M22 2L11 13"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M22 2L15 22L11 13L2 9L22 2Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Message;
