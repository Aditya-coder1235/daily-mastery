import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const CreateProduct = () => {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
    });

    const createProduct = async () => {
        try {
            let res = await axios.post(
                "http://localhost:8080/api/product/create",
                formData,
                { withCredentials: true },
            );
            // console.log(res.data);
            navigate('/')
        } catch (error) {
            console.log(
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
        createProduct();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Create Product
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <textarea
                        name="description"
                        placeholder="Product Description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                        className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    >
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="books">Books</option>
                        <option value="home">Home</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Create Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
