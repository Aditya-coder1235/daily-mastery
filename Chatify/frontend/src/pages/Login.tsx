import {useState} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserFormData={
    email:string;
    password:string
}

const Login = () => {
    const navigate=useNavigate()
    const [formData, setFormData] = useState<UserFormData>({
        email: "",
        password: "",
    });

    const LoginUser = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8080/api/auth/login",
                formData,
                { withCredentials: true },
            );
            console.log(res.data.user);
            localStorage.setItem("userName", res.data.user.name);
            localStorage.setItem("userId", res.data.user._id);

            navigate("/")
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        LoginUser();
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-slate-900 mb-6 text-center">
                    Sign in to your account
                </h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleOnChange}
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
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
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleOnChange}
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
