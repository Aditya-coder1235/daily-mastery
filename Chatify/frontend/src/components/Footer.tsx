const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-200 py-6">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm">
                    © 2026 Your Company. All rights reserved.
                </p>
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
