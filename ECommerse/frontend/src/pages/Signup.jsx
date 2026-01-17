import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
    });

    async function register() {
        try {
            let res = await axios.post(
                "http://localhost:8080/api/user/signup",
                formData
            );
            // console.log(res.data.user.role);
            // localStorage.setItem('role',res.data.role)
            navigate("/login");

            alert("User register successfully!!");
        } catch (error) {
            console.error(error.response?.data);
            alert(error.response?.data?.message || "Signup failed");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        register();
        // setFormData('')
    };

    const handleOnchange = (e) => {
        let { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="border mt-30  mb-10 w-96 p-5 rounded-2xl m-auto signupform flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Signup Now</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 mt-3 items-center"
            >
                <div>
                    <label htmlFor="">Username</label>
                    <input
                        type="text"
                        placeholder="enter your username...."
                        name="name"
                        value={formData.name}
                        onChange={handleOnchange}
                        className="border pl-3 w-80 rounded h-10"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        placeholder="enter your email..."
                        name="email"
                        value={formData.email}
                        onChange={handleOnchange}
                        className="border pl-3 w-80 rounded h-10"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        placeholder="**********"
                        name="password"
                        value={formData.password}
                        onChange={handleOnchange}
                        className="border pl-3 w-80 rounded h-10"
                        required
                    />
                </div>
                {/* <input type='' /> */}

                <div>
                    <label htmlFor="">Select Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleOnchange}
                        className="border pl-3 w-80 rounded h-10"
                        required
                    >
                        <option value="">Select role</option>
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 rounded px-7 py-2 text-gray-50">
                    Signup
                </button>
            </form>

            <span className="">
                {" "}
                Already have account ? &nbsp;
                <a href="/login" className="text-blue-500">
                    Login
                </a>
            </span>
        </div>
    );
};

export default Signup;
