import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Signup = () => {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const registerUser = async () => {
        try {
            let res = await axios.post(
                "http://localhost:8080/api/auth/signup",
                formData,
                { withCredentials: true },
            );
            // console.log(res.data);
            navigate('/login')
        } catch (error) {
             console.log(error.response?.data?.message);
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        registerUser()
    };

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Create Account
                </h2>

                <form className="space-y-4" onSubmit={handleOnSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                        name="name"
                        value={formData.name}
                        onChange={handleOnChange}
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                        name="email"
                        value={formData.email}
                        onChange={handleOnChange}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                        name="password"
                        value={formData.password}
                        onChange={handleOnChange}
                    />

                    <select
                        className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                        name="role"
                        value={formData.role}
                        onChange={handleOnChange}
                    >
                        <option value="" disabled>
                            Select Role
                        </option>
                        <option value="user">User</option>
                        <option value="seller">Seller</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
