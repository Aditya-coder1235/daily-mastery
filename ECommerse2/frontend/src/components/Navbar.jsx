import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { filterByInput } from "../features/productSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    const logoutUser = async () => {
        try {
            await axios.post(
                "http://localhost:8080/api/auth/logout",
                {},
                { withCredentials: true },
            );

            localStorage.clear();
            navigate("/login");
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    const handleOnChange = (e) => {
        const value = e.target.value;
        setInput(value);
        dispatch(filterByInput(value));
    };

    const role=localStorage.getItem('role')
    const userId = localStorage.getItem("userId");


    return (
        <nav className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img src="/vite.svg" alt="logo" className="w-8 h-8" />
                <span className="font-semibold text-lg text-gray-800">
                    MyApp
                </span>
            </div>

            <div className="hidden sm:block">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={input}
                    onChange={handleOnChange}
                    className="w-72 px-3 py-2 border rounded-md text-sm outline-none 
                     focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="flex items-center gap-4 text-sm font-medium">
                <Link to="/" className="text-gray-700 hover:text-blue-600">
                    Home
                </Link>

                <button
                    className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition"
                    onClick={()=>navigate('/cart')}
                >
                    Cart
                </button>

                {!userId && (
                    <>
                        <Link
                            to="/signup"
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Signup
                        </Link>

                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Login
                        </Link>
                    </>
                )}

                {role === "seller" && (
                    <>
                        <Link
                            to="/create"
                            className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition"
                        >
                            Upload
                        </Link>

                        <button
                            className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition"
                            onClick={() => navigate("/sellerProduct")}
                        >
                            View Products
                        </button>
                    </>
                )}

                {userId && (
                    <button
                        onClick={logoutUser}
                        className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
