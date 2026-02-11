import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router";

const Signup = () => {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });
    const [error,setError]=useState('')

    const signupUser=async()=>{
        try {
            await axios.post("http://localhost:8080/api/auth/signup",formData,{withCredentials:true});

            // console.log(res.data)
            navigate('/login')
            
        } catch (error) {
            console.error("Error:", error.response.data.message);
            setError(error.response.data.message || "Please Try Again!!");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        setError(""); 
        signupUser()
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Account
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

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

                <div className="mb-4">
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

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">
                        Role
                    </label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="user">User</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>

                {error && (
                    <p className="font-semibold text-red-600 mb-4">{error}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition"
                >
                    Sign Up
                </button>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-yellow-500 font-semibold cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Signup;
