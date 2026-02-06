import React from "react";

const Footer = () => {
    return (
        <footer className="w-full h-20 flex items-center justify-center bg-gray-900 text-gray-300 py-4 mt-10">
            <div className="text-center text-sm">
                © {new Date().getFullYear()} MyApp. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
