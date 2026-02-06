import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const[error,setError]=useState('')

    const loginUser = async () => {
        try {
            let res = await axios.post(
                "http://localhost:8080/api/auth/login",
                formData,
                { withCredentials: true },
            );
            // console.log();
            localStorage.setItem('name',res.data.user.name)
            localStorage.setItem("userId", res.data.user._id);
            localStorage.setItem("role", res.data.user.role);


            navigate("/");
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        //    console.log(error.response?.data?.message);
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        loginUser();
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
                    Login
                </h2>

                <form className="space-y-4" onSubmit={handleOnSubmit}>
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
                    {error ? <p className="text-red-600">{error}</p> : ""}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
