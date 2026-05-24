"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
    const router = useRouter();

     const logout = async () => {
         try {
             const response = await axios.post(
                 "http://localhost:8080/api/auth/logout",
                 {},
                 {withCredentials: true}
             );
             console.log("Logout successful:", response.data);

             localStorage.removeItem("userId");
             localStorage.removeItem("userName");
             router.push("/login");
         } catch (error) {
             console.error("Signup failed:", error);
         }
     };

    return (
        <nav className="w-full bg-white border-b shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-xl font-bold text-gray-800"
                        >
                            MyApp
                        </Link>
                    </div>

                    <div className="flex-1 flex items-center justify-center px-2">
                        <div className="max-w-lg w-full">
                            <label htmlFor="search" className="sr-only">
                                Search
                            </label>
                            <div className="relative">
                                <input
                                    id="search"
                                    className="block w-full pl-3 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Search..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Link
                            href="/"
                            className="text-l font text-gray-800"
                        >
                            Home
                        </Link>
                        <Link
                            href="/signup"
                            className="px-3 py-1 rounded-md text-sm font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
                        >
                            Signup
                        </Link>
                        <Link
                            href="/login"
                            className="px-3 py-1 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Login
                        </Link>
                        {/* <span className="text-sm text-gray-700">
                                    You are signed in
                                </span> */}
                        <button onClick={()=>logout()} className="px-3 py-1 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
