import React from "react";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-200 py-6">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-sm">
                    &copy; {new Date().getFullYear()} My Website. All rights
                    reserved.
                </span>
                <div className="flex gap-4 text-sm">
                    <a href="#" className="hover:text-white">
                        Privacy
                    </a>
                    <a href="#" className="hover:text-white">
                        Terms
                    </a>
                    <a href="#" className="hover:text-white">
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
