import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ShoppingCart } from "lucide-react";
import { CirclePlus } from "lucide-react";
// import { ChevronDown } from "lucide-react";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { filterForSearch } from "../features/productSlice";
import { useDispatch } from "react-redux";
import { ChartNoAxesGantt } from "lucide-react";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()

    const shop=useContext(ShopContext)

    const[text,setText]=useState("")

    const logoutUser = async () => {
        try {
            await axios.post(
                "http://localhost:8080/api/auth/logout",
                {},
                { withCredentials: true },
            );

            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            localStorage.removeItem("email");

            // console.log(res.data)
            navigate("/login");
        } catch (error) {
            console.error("Error:", error.response.data.message);
        }
    };

    const handleOnChange=(e)=>{
        setText(e.target.value)
        dispatch(filterForSearch(e.target.value));
    }

    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    const isSeller = role === "seller";

    return (
        <nav className="flex h-19  w-full items-center gap-16 ">
            <div className="ms-28">
                <Link to={"/"}>
                    <h2 className="text-2xl font-bold">FashionStore</h2>
                </Link>
            </div>
            <div className="flex items-center gap-7 font-semibold">
                <button
                    className="flex items-center"
                    onClick={() =>
                        shop.current?.scrollIntoView({ behavior: "smooth" })
                    }
                >
                    Shop
                </button>
                <Link>Brands</Link>
                {userId ? (
                    <button onClick={() => logoutUser()}>Logout</button>
                ) : (
                    <div className="flex gap-5">
                        <Link to={"/signup"}>Signup</Link>
                        <Link to={"/login"}>Login</Link>
                    </div>
                )}
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search for Products....."
                    value={text}
                    onChange={handleOnChange}
                    className="bg-gray-200 outline-none border-none w-100 h-10 ps-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>
            <div className="flex items-center gap-8">
                <Link to={"/cart"}>
                    <span className="cursor-pointer">
                        <ShoppingCart />
                    </span>
                </Link>
                <button
                    onClick={() => navigate("/create")}
                    disabled={!isSeller}
                    className={`flex items-center gap-2 cursor-pointer bg-gray-200 px-3 py-1.5 rounded-2xl
        ${
            role === "seller"
                ? "bg-black text-black hover:bg-gray-800 hover:text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
                >
                    <CirclePlus /> <p className="text-xs">Add Product</p>
                </button>

                <button className="flex items-center" disabled={!isSeller} onClick={()=>navigate('/manage')}>
                    <p className="text-xs">
                        <ChartNoAxesGantt />{" "}
                    </p>
                    <span className="text-xs">Manage Products</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
