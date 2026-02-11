import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const loginUser = async () => {
        try {
            let res=await axios.post("http://localhost:8080/api/auth/login", formData, {
                withCredentials: true,
            });

            localStorage.setItem("userId", res.data.user._id);
            localStorage.setItem("email", res.data.user.email);
            localStorage.setItem("role", res.data.user.role);


            navigate("/");
        } catch (error) {
            console.error("Login Error:", error.response?.data?.message);
            setError(
                error.response?.data?.message || "Invalid email or password",
            );
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); 
        loginUser();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Login to Your Account
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                {error && (
                    <p className="font-semibold text-red-600 mb-4">{error}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition"
                >
                    Login
                </button>

                <p className="text-sm text-center mt-4">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-yellow-500 font-semibold cursor-pointer hover:underline"
                    >
                        Sign Up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
