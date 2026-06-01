import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserFormData={
    name:string;
    email:string;
    password:string
}

const Signup = () => {
    const navigate=useNavigate()
    const [formData, setFormData] = useState<UserFormData>({
        name: "",
        email: "",
        password: "",
    });

    const SignupUser = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8080/api/auth/signup",
                formData,
                { withCredentials: true },
            );
            console.log(res.data);
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        SignupUser()
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
                <h1 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
                    Create an account
                </h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleOnChange}
                            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleOnChange}
                            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter a secure password"
                            value={formData.password}
                            onChange={handleOnChange}
                            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
