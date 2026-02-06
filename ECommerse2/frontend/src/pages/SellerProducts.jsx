import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router'

const SellerProducts = () => {
    const userId = localStorage.getItem("userId");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate()

    const fetchProductsByUser = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/product/getByUserId`,
                { withCredentials: true },
            );

            setProducts(res.data.products || res.data.product); 
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const res = await axios.delete(
                `http://localhost:8080/api/product/delete/${id}`,
                { withCredentials: true },
            );

            // console.log(res.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProductsByUser();
    }, []);

    if (loading) {
        return (
            <p className="text-center mt-10 text-gray-600">
                Loading your products...
            </p>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-2xl font-semibold mb-6">Seller Products</h2>

            {products.length === 0 ? (
                <p className="text-gray-500">No products uploaded yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
                        >
                            <span className="text-xs text-gray-500 uppercase">
                                {product.category}
                            </span>

                            <h3 className="text-lg font-semibold mt-1">
                                {product.name}
                            </h3>

                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                {product.description}
                            </p>

                            <p className="text-green-600 font-bold mt-3">
                                ₹{product.price}
                            </p>

                            <div className="flex gap-2 mt-4">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                                onClick={()=>navigate(`/update/${product._id}`)}>
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600" onClick={()=>deleteProduct(product._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SellerProducts;
