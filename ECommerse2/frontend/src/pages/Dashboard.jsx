import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../features/productSlice";
import Card from "../components/Card";
import { useNavigate } from "react-router";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const { products, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchAllProduct());
    }, [dispatch]);

    const user = localStorage.getItem("name");

    if(!user){
        return navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full bg-amber-100 h-20 flex items-center px-4">
                {user && (
                    <h3 className="text-blue-600 font-semibold text-2xl md:text-3xl">
                        Welcome Back <span className="underline">{user}</span>{" "}
                        🥳
                    </h3>
                )}
            </div>

            <div className="p-6">
                {loading && (
                    <p className="text-center text-lg text-gray-600">
                        Loading products...
                    </p>
                )}

                {error && (
                    <p className="text-center text-red-500 font-semibold">
                        {error}
                    </p>
                )}

                {products?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Card
                                key={product._id || product.id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                category={product.category}
                                id={product._id || product.id}
                            />
                        ))}
                    </div>
                )}

                {!loading && products?.products?.length === 0 && (
                    <p className="text-center text-gray-500">
                        No products available
                    </p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
