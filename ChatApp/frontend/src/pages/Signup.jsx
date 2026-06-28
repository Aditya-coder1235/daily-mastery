import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const signupUser = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.post(
                "http://localhost:8080/api/auth/signup",
                formData,
                {
                    withCredentials: true,
                },
            );
            if (res.data) navigate("/login");
        } catch (err) {
            setError(
                err.response?.data?.message || "Signup failed. Try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signupUser();
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#0f0f1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
            }}
        >
            <div
                style={{
                    background: "#1a1a2e",
                    border: "1px solid #2d2d4e",
                    borderRadius: "20px",
                    padding: "40px",
                    width: "100%",
                    maxWidth: "420px",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                }}
            >
                {/* Logo mark */}
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <div
                        style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "16px",
                            background:
                                "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "22px",
                            marginBottom: "16px",
                            boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
                        }}
                    >
                        💬
                    </div>
                    <h2
                        style={{
                            color: "#f1f5f9",
                            fontSize: "22px",
                            fontWeight: "700",
                            margin: 0,
                        }}
                    >
                        Create an account
                    </h2>
                    <p
                        style={{
                            color: "#64748b",
                            fontSize: "14px",
                            marginTop: "6px",
                        }}
                    >
                        Join and start chatting
                    </p>
                </div>

                {error && (
                    <div
                        style={{
                            background: "rgba(239,68,68,0.12)",
                            border: "1px solid rgba(239,68,68,0.3)",
                            borderRadius: "10px",
                            padding: "10px 14px",
                            color: "#f87171",
                            fontSize: "13px",
                            marginBottom: "20px",
                        }}
                    >
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                    }}
                >
                    {[
                        {
                            label: "Name",
                            name: "name",
                            type: "text",
                            placeholder: "Your full name",
                        },
                        {
                            label: "Email",
                            name: "email",
                            type: "email",
                            placeholder: "you@example.com",
                        },
                        {
                            label: "Password",
                            name: "password",
                            type: "password",
                            placeholder: "••••••••",
                        },
                    ].map(({ label, name, type, placeholder }) => (
                        <div key={name}>
                            <label
                                style={{
                                    display: "block",
                                    color: "#94a3b8",
                                    fontSize: "13px",
                                    fontWeight: "500",
                                    marginBottom: "8px",
                                }}
                            >
                                {label}
                            </label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                required
                                style={{
                                    width: "100%",
                                    background: "#0f0f1a",
                                    border: "1px solid #2d2d4e",
                                    borderRadius: "12px",
                                    padding: "12px 16px",
                                    color: "#e2e8f0",
                                    fontSize: "14px",
                                    outline: "none",
                                    boxSizing: "border-box",
                                    transition: "border-color 0.2s",
                                }}
                                onFocus={(e) =>
                                    (e.target.style.borderColor = "#6366f1")
                                }
                                onBlur={(e) =>
                                    (e.target.style.borderColor = "#2d2d4e")
                                }
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: loading
                                ? "#3730a3"
                                : "linear-gradient(135deg, #6366f1, #7c3aed)",
                            border: "none",
                            borderRadius: "12px",
                            padding: "13px",
                            color: "#fff",
                            fontSize: "15px",
                            fontWeight: "600",
                            cursor: loading ? "not-allowed" : "pointer",
                            marginTop: "4px",
                            boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
                            transition: "opacity 0.2s",
                        }}
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <p
                    style={{
                        textAlign: "center",
                        color: "#64748b",
                        fontSize: "13px",
                        marginTop: "24px",
                    }}
                >
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        style={{
                            color: "#818cf8",
                            textDecoration: "none",
                            fontWeight: "500",
                        }}
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
