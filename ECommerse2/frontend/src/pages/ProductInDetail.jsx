import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { addToCart } from "../features/cartSlice";
import {useDispatch} from 'react-redux'

const ProductInDetail = () => {
    const { id } = useParams();
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProductById = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/product/getById/${id}`,
                { withCredentials: true },
            );
            setProduct(res.data.product);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductById();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-600">Loading product...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {product && (
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex justify-center items-center bg-gray-100 rounded-xl h-72">
                        <span className="text-gray-400 text-sm">
                            Product Image
                        </span>
                    </div>

                    <div className="md:col-span-1">
                        <span className="inline-block text-xs uppercase tracking-wide text-gray-500 mb-1">
                            {product.category}
                        </span>

                        <h1 className="text-3xl font-bold text-gray-800">
                            {product.name}
                        </h1>

                        <p className="text-gray-600 mt-4 leading-relaxed">
                            {product.description}
                        </p>

                        <p className="text-3xl font-semibold text-green-600 mt-6">
                            ₹{product.price}
                        </p>

                        <button className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                        onClick={()=>dispatch(addToCart(product))}
                        >
                            Add to Cart
                        </button>
                    </div>

                    
                </div>
            )}
        </div>
    );
};

export default ProductInDetail;
