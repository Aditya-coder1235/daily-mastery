import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        FashionStore
                    </h2>
                    <p className="text-sm leading-relaxed">
                        Discover the latest fashion trends for men & women.
                        Premium quality clothing at affordable prices.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:text-yellow-400">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-yellow-400">
                                Shop
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-yellow-400">
                                New Arrivals
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-yellow-400">
                                Offers
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Customer Service
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:text-yellow-400">
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-yellow-400">
                                Returns
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-yellow-400">
                                Shipping
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-yellow-400">
                                FAQs
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Newsletter
                    </h3>
                    <p className="text-sm mb-3">
                        Subscribe for latest offers & updates
                    </p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full px-3 py-2 text-black text-sm rounded-l-md focus:outline-none"
                        />
                        <button className="bg-yellow-400 text-black px-4 py-2 text-sm font-semibold rounded-r-md hover:bg-yellow-500">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 text-center py-4 text-sm">
                © {new Date().getFullYear()} FashionStore. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
