import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";

const AllProducts = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className="mt-24 all px-5 mb-20">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                All Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product._id}
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="bg-gray-100 cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 ms-7 mt-2 line-clamp-1">
                            {product.title}
                        </h3>
                        <div className="h-48 w-full bg-gray-100 flex justify-center">
                            <img
                                src={`http://localhost:8080${product.image}`}
                                alt={product.title}
                                className="w-[90%] h-full object-cover rounded-2xl"
                            />
                        </div>

                        <div className="p-4">
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {product.description}
                            </p>

                            <p className="text-xl font-bold text-blue-600">
                                ₹{product.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
