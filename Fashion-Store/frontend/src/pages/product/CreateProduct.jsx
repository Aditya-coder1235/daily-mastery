import React, { useState } from "react";
import axios from 'axios'
// import { useNavigate } from "react-router";

const CreateProduct = () => {
    // const navigate=useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "formal",
        price: "",
    });

    const [error, setError] = useState("");

    const createProduct = async () => {
        try {
            let res = await axios.post(
                "http://localhost:8080/api/product/create",
                formData,
                {
                    withCredentials: true,
                },
            );

            // navigate("/");
            console.log(res.data)
        } catch (error) {
            console.error("Creating Error", error.response?.data?.message);
            setError(
                error.response?.data?.message || "Something went wrong",
            );
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        createProduct()
        // setFormData("")

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Product
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter product name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="3"
                        placeholder="Enter product description"
                        className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="formal">Formal</option>
                        <option value="gym">Gym</option>
                        <option value="party">Party</option>
                        <option value="casual">Casual</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">
                        Price (₹)
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        placeholder="Enter price"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
                {
                    error && <p className="text-red-600 font-semibold mb-3">{error}</p>
                }

                <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
