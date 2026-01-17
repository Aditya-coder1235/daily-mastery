import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SellProduct = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    async function createProduct() {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("image", image);

            let res = await axios.post(
                "http://localhost:8080/api/product/create",
                formData,
                { withCredentials: true }
            );
            // console.log(res.data)
            alert("Product upload successfully");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct();
    };

    let token = localStorage.getItem("token");

    return (
        <div className="border mt-30 sell  mb-10 w-96 p-10 rounded-2xl m-auto  flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Sell Your Product</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 mt-7 items-center"
            >
                <div>
                    <label htmlFor="">Product Name</label>
                    <input
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder="Enter product name"
                        className="border pl-3 w-80 rounded h-10"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="">Product Description</label>
                    <input
                        type="text"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder="Enter product description"
                        className="border pl-3 w-80 rounded h-10"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="">Product Image</label>
                    <input
                        type="file"
                        name="price"
                        onChange={(e) => setImage(e.target.files[0])}
                        placeholder="Enter price"
                        className="border pl-3 w-80 rounded h-10"
                        required
                        accept="image/*"
                    />
                </div>

                <div>
                    <label htmlFor="">Product Price</label>
                    <input
                        type="number"
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder="Enter price"
                        className="border pl-3 w-80 rounded h-10"
                        required
                    />
                </div>
                {token && (
                    <button className="bg-blue-600 hover:bg-blue-700 rounded px-7 py-2 text-gray-50">
                        Sell
                    </button>
                )}
            </form>
        </div>
    );
};

export default SellProduct;
