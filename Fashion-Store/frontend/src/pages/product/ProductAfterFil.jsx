import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ProductAfterFil = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productsForFil } = useSelector((state) => state.product);

    console.log(productsForFil);
    return (
        <div className="px-6 lg:px-16 mt-10">
            <h2 className="text-center text-3xl font-bold">ALL CLOTHES</h2>
            <div className="border-b mt-3 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                {productsForFil.map((product) => {
                    return (
                        <div
                            className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer w-60"
                            onClick={() => navigate(`/product/${product._id}`)}
                        >
                            <div className="w-full h-56 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                />
                            </div>

                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 truncate">
                                    {product.name}
                                </h3>

                                <div className="flex items-center gap-1 mt-2">
                                    <span className="text-yellow-400">
                                        ★ ★ ★ ★ ☆
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        (4.0)
                                    </span>
                                </div>

                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-lg font-bold text-gray-900">
                                        ₹{product.price}
                                    </span>
                                    <span className="text-sm text-gray-500 line-through">
                                        ₹{product.originalPrice}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductAfterFil;
