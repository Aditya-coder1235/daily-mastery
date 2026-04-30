import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await api.post(
                "http://localhost:8080/api/auth/logout",
                {},
                { withCredentials: true },
            );

            console.log("Logout:", res.data);

            localStorage.removeItem("id")

            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link to="/dashboard" className="text-xl font-bold text-white">
                    MERN Auth
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        to="/dashboard"
                        className={`text-sm font-medium transition ${
                            location.pathname === "/dashboard"
                                ? "text-cyan-300"
                                : "text-slate-200 hover:text-white"
                        }`}
                    >
                        Dashboard
                    </Link>

                    <button
                        onClick={() => navigate("/login")}
                        className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
                    >
                        Login
                    </button>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
