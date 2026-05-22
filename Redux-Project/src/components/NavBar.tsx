import React from "react";
import {fetchProductsByInput} from "../redux/feature/productSlice";
import { useDispatch } from "react-redux";

const NavBar = () => {
    const[text, setText] = React.useState("")
    const dispatch = useDispatch()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(fetchProductsByInput(text))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    return (
        <nav className="bg-white shadow-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
                <div className="text-lg font-semibold text-slate-900">
                    My Brand
                </div>
                <ul className="hidden items-center space-x-6 text-slate-700 md:flex">
                    <li className="cursor-pointer transition hover:text-slate-900">
                        Home
                    </li>
                    <li className="cursor-pointer transition hover:text-slate-900">
                        Products
                    </li>
                    <li className="cursor-pointer transition hover:text-slate-900">
                        Contact
                    </li>
                </ul>
                <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 md:w-auto">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                        value={text}
                        onChange={handleInputChange}
                    />
                    <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
                        Search
                    </button>
                </form>
            </div>
        </nav>
    );
};

export default NavBar;
