import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();

    const Logout = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8080/api/auth/logout",
                {},
                { withCredentials: true },
            );
            console.log(res.data.user);
            localStorage.removeItem("userName");
            localStorage.removeItem("userId");

            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <span className="text-xl font-semibold text-gray-900">
                            MyApp
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                        <button
                            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </button>
                        <button
                            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                            onClick={() => Logout()}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
