import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <span className="text-lg font-semibold">MyApp</span>
                    <span className="text-sm text-gray-400">
                        © {new Date().getFullYear()}
                    </span>
                </div>
                <nav>
                    <ul className="flex items-center space-x-4">
                        <li>
                            <a href="#" className="text-sm hover:text-white">
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about"
                                className="text-sm hover:text-white"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="text-sm hover:text-white"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
