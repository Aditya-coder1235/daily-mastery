import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const[error,setError]=useState("")

    async function login() {
        try {
            let res = await axios.post(
                "http://localhost:8080/api/user/login",
                formData,
                {withCredentials:true}
            );
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);
            alert("User Login Successfully....");
            navigate("/");
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong");
            }
            console.error(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
        setError("")
    };

    const handleOnchange = (e) => {
        let { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="border mt-30  mb-10 w-96 p-10 rounded-2xl m-auto  flex flex-col gap-2 loginform">
            <h1 className="text-2xl font-semibold">Login Now</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 mt-7 items-center"
            >
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
                <button className="bg-blue-600 hover:bg-blue-700 rounded px-7 py-2 text-gray-50">
                    Login
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>

            <span className="mt-5">
                {" "}
                Not have an account ? &nbsp;
                <a href="/signup" className="text-blue-500">
                    Signup first
                </a>
            </span>
        </div>
    );
};

export default Signup;
