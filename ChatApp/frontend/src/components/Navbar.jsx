import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("userId");

    const logoutUser = async () => {
        try {
            await axios.post(
                "http://localhost:8080/api/auth/logout",
                {},
                { withCredentials: true },
            );
            localStorage.removeItem("userId");
            localStorage.removeItem("name");
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav
            style={{
                background: "#1a1a2e",
                borderBottom: "1px solid #2d2d4e",
                padding: "0 24px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                position: "sticky",
                top: 0,
                zIndex: 100,
            }}
        >
            {/* Brand */}
            <Link
                to="/"
                style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <div
                    style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "15px",
                    }}
                >
                    💬
                </div>
                <span
                    style={{
                        color: "#f1f5f9",
                        fontWeight: "700",
                        fontSize: "17px",
                    }}
                >
                    ChatApp
                </span>
            </Link>

            {/* Nav links */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {!userId ? (
                    <>
                        <Link to="/signup" style={linkStyle}>
                            Sign Up
                        </Link>
                        <Link to="/login" style={linkStyle}>
                            Login
                        </Link>
                    </>
                ) : (
                    <>
                        <span
                            style={{
                                color: "#94a3b8",
                                fontSize: "13px",
                                marginRight: "8px",
                            }}
                        >
                            Hi,{" "}
                            <span
                                style={{ color: "#818cf8", fontWeight: "500" }}
                            >
                                {name}
                            </span>
                        </span>
                        <button
                            onClick={logoutUser}
                            style={{
                                background: "rgba(239,68,68,0.15)",
                                border: "1px solid rgba(239,68,68,0.3)",
                                borderRadius: "10px",
                                padding: "7px 16px",
                                color: "#f87171",
                                fontSize: "13px",
                                fontWeight: "500",
                                cursor: "pointer",
                                transition: "background 0.2s",
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.background =
                                    "rgba(239,68,68,0.25)")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.background =
                                    "rgba(239,68,68,0.15)")
                            }
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

const linkStyle = {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px",
    padding: "7px 14px",
    borderRadius: "10px",
    fontWeight: "500",
    transition: "color 0.2s, background 0.2s",
};

export default Navbar;
