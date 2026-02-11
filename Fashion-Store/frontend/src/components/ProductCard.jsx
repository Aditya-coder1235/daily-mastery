import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
    const navigate=useNavigate()
    // console.log(product.image)
    return (
        <div
            className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer w-60"
            onClick={() => navigate(`/product/${product._id}`)}
        >
            <div className="w-full h-56 overflow-hidden">
                <img
                    src={`http://localhost:8080${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                </h3>

                <div className="flex items-center gap-1 mt-2">
                    <span className="text-yellow-400">★ ★ ★ ★ ☆</span>
                    <span className="text-sm text-gray-500">(4.0)</span>
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
};

export default ProductCard;
