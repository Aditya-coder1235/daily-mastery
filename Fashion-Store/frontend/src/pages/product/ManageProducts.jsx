import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const ManageProducts = () => {
    const navigate=useNavigate()
    const [products, setProducts] = useState([]);

    const fetchProductForSeller = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/product/getForSeller",
                { withCredentials: true },
            );
            setProducts(res.data.products);
        } catch (error) {
            console.error("Fetching product Error", error);
        }
    };

    const deleteProducts = async (id) => {
        try {
            const res = await axios.delete(
                `http://localhost:8080/api/product/delete/${id}`,
                { withCredentials: true },
            );
            // setProducts(res.data.products);
            console.log(res.data)
        } catch (error) {
            console.error("deleting product Error", error);
        }
    };

    useEffect(() => {
        fetchProductForSeller();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

            {products.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={`http://localhost:8080${product.image}`}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded-lg mb-3"
                            />

                            <h3 className="text-lg font-semibold">
                                {product.name}
                            </h3>

                            <p className="text-sm text-gray-600 line-clamp-2">
                                {product.description}
                            </p>

                            <div className="flex justify-between items-center mt-4">
                                <span className="font-bold text-lg">
                                    ₹{product.price}
                                </span>

                                <div className="flex gap-2">
                                    <button onClick={()=>navigate(`/update/${product._id}`)} className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                        Edit
                                    </button>
                                    <button onClick={()=>deleteProducts(product._id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageProducts;
