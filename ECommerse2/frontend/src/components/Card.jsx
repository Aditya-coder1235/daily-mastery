import React from "react";
import { useNavigate } from "react-router";

const Card = ({ name, description, price, category, id }) => {
    const navigate=useNavigate()
    return (
        <div
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300 cursor-pointer"
            onClick={() => navigate(`/product/${id}`)}
        >
            <span className="text-xs text-gray-500 uppercase tracking-wide">
                {category}
            </span>

            <h2 className="text-lg font-semibold text-gray-800 mt-1">{name}</h2>

            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {description}
            </p>

            <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-green-600">
                    ₹{price}
                </span>

                <button
                    onClick={() => navigate(`/product/${id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                >
                    View in Detail
                </button>
            </div>
        </div>
    );
};

export default Card;
