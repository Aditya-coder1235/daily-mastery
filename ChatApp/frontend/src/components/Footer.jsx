import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer
            style={{
                background: "#1a1a2e",
                borderTop: "1px solid #2d2d4e",
                padding: "40px 24px 24px",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
            }}
        >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(160px, 1fr))",
                        gap: "32px",
                        marginBottom: "32px",
                    }}
                >
                    {/* Brand */}
                    <div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "12px",
                            }}
                        >
                            <div
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "8px",
                                    background:
                                        "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "13px",
                                }}
                            >
                                💬
                            </div>
                            <span
                                style={{
                                    color: "#f1f5f9",
                                    fontWeight: "700",
                                    fontSize: "15px",
                                }}
                            >
                                ChatApp
                            </span>
                        </div>
                        <p
                            style={{
                                color: "#64748b",
                                fontSize: "13px",
                                lineHeight: "1.6",
                                margin: 0,
                            }}
                        >
                            Simple, fast messaging for everyone.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4
                            style={{
                                color: "#94a3b8",
                                fontSize: "12px",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                marginBottom: "12px",
                            }}
                        >
                            Navigation
                        </h4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                            }}
                        >
                            {[
                                ["Home", "/"],
                                ["Dashboard", "/dashboard"],
                                ["Login", "/login"],
                            ].map(([label, href]) => (
                                <Link
                                    key={label}
                                    to={href}
                                    style={{
                                        color: "#64748b",
                                        textDecoration: "none",
                                        fontSize: "13px",
                                        transition: "color 0.2s",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.target.style.color = "#818cf8")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.target.style.color = "#64748b")
                                    }
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h4
                            style={{
                                color: "#94a3b8",
                                fontSize: "12px",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                marginBottom: "12px",
                            }}
                        >
                            Follow
                        </h4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                            }}
                        >
                            {["Twitter", "GitHub", "Instagram"].map((s) => (
                                <a
                                    key={s}
                                    href="#"
                                    style={{
                                        color: "#64748b",
                                        textDecoration: "none",
                                        fontSize: "13px",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.target.style.color = "#818cf8")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.target.style.color = "#64748b")
                                    }
                                >
                                    {s}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        borderTop: "1px solid #2d2d4e",
                        paddingTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <p
                        style={{
                            color: "#4a4a6a",
                            fontSize: "12px",
                            margin: 0,
                        }}
                    >
                        © {new Date().getFullYear()} ChatApp. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
