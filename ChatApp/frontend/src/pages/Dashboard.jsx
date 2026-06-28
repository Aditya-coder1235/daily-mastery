import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUserId = localStorage.getItem("userId");

    const fetchUsers = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/auth/getAllUsers",
            );
            // Filter out the logged-in user from the list
            setUsers(res.data.filter((u) => u._id !== currentUserId));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const startConversation = async (id) => {
        try {
            const res = await axios.post(
                `http://localhost:8080/api/conversation/start/${id}`,
                {},
                { withCredentials: true },
            );
            localStorage.setItem("conversationId", res.data._id);
            navigate(`/message/${res.data._id}`);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const getInitial = (name) => name?.charAt(0).toUpperCase() || "?";

    const avatarColors = [
        "linear-gradient(135deg, #6366f1, #8b5cf6)",
        "linear-gradient(135deg, #0ea5e9, #6366f1)",
        "linear-gradient(135deg, #8b5cf6, #ec4899)",
        "linear-gradient(135deg, #10b981, #6366f1)",
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#0f0f1a",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                padding: "32px 20px",
            }}
        >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                <div style={{ marginBottom: "28px" }}>
                    <h1
                        style={{
                            color: "#f1f5f9",
                            fontSize: "24px",
                            fontWeight: "700",
                            margin: 0,
                        }}
                    >
                        People
                    </h1>
                    <p
                        style={{
                            color: "#64748b",
                            fontSize: "14px",
                            marginTop: "4px",
                        }}
                    >
                        Start a conversation with anyone below
                    </p>
                </div>

                {loading ? (
                    <div
                        style={{
                            color: "#64748b",
                            textAlign: "center",
                            marginTop: "60px",
                        }}
                    >
                        Loading users...
                    </div>
                ) : users.length === 0 ? (
                    <div
                        style={{
                            color: "#64748b",
                            textAlign: "center",
                            marginTop: "60px",
                        }}
                    >
                        No other users found.
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                        }}
                    >
                        {users.map((item, idx) => (
                            <div
                                key={item._id}
                                style={{
                                    background: "#1a1a2e",
                                    border: "1px solid #2d2d4e",
                                    borderRadius: "16px",
                                    padding: "16px 20px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "16px",
                                    transition:
                                        "border-color 0.2s, box-shadow 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor =
                                        "#6366f1";
                                    e.currentTarget.style.boxShadow =
                                        "0 0 0 1px #6366f1";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor =
                                        "#2d2d4e";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                {/* Avatar */}
                                <div
                                    style={{
                                        width: "46px",
                                        height: "46px",
                                        borderRadius: "50%",
                                        flexShrink: 0,
                                        background:
                                            avatarColors[
                                                idx % avatarColors.length
                                            ],
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        color: "#fff",
                                    }}
                                >
                                    {getInitial(item.name)}
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div
                                        style={{
                                            color: "#f1f5f9",
                                            fontWeight: "600",
                                            fontSize: "15px",
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                    <div
                                        style={{
                                            color: "#64748b",
                                            fontSize: "13px",
                                            marginTop: "2px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {item.email}
                                    </div>
                                </div>

                                {/* Chat button */}
                                <button
                                    onClick={() => startConversation(item._id)}
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #6366f1, #7c3aed)",
                                        border: "none",
                                        borderRadius: "12px",
                                        padding: "9px 20px",
                                        color: "#fff",
                                        fontSize: "13px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        flexShrink: 0,
                                        boxShadow:
                                            "0 2px 10px rgba(99,102,241,0.35)",
                                    }}
                                >
                                    Message
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
