import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../features/productSlice";
import ProductCard from "../components/ProductCard";
import { filterByCate } from "../features/productSlice";
import { useNavigate } from "react-router";
// import { ShopContext } from "../context/shopContext";
import { useContext } from "react";
import { ShopContext } from "../context/shopContext";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const { products, loading, error } = useSelector((state) => state.product);


const shopRef = useContext(ShopContext);
    useEffect(() => {
        dispatch(fetchAllProducts());
    }, []);

    // console.log(products)


    return (
        <div>
            <div className="min-h-screen bg-gray-100">
                <div
                    className="bg-cover bg-center h-162.2 lg:h-175"
                    style={{
                        backgroundImage: "url('/dashboard.png')",
                    }}
                >
                    <div className="flex flex-col gap-5 pt-20 pl-10 lg:pl-20">
                        <h2 className="text-4xl lg:text-5xl font-extrabold">
                            FIND CLOTHES <br />
                            THAT MATCHES <br />
                            YOUR STYLE
                        </h2>

                        <p className="text-sm opacity-60 max-w-xl">
                            Browse through our diverse range of meticulously
                            crafted garments, designed to bring out your
                            individuality and cater to your sense of style.
                        </p>

                        <button
                            onClick={() =>
                                shopRef.current?.scrollIntoView({
                                    behavior: "smooth",
                                })
                            }
                            className="bg-black text-white px-10 py-2 rounded-3xl w-40"
                        >
                            Shop Now
                        </button>

                        <div className="flex gap-10 mt-9">
                            <div>
                                <h2 className="text-4xl font-bold">200+</h2>
                                <p className="text-sm opacity-65">
                                    International Brands
                                </p>
                            </div>
                            <div>
                                <h2 className="text-4xl font-bold">2,000+</h2>
                                <p className="text-sm opacity-65">
                                    High-Quality Products
                                </p>
                            </div>
                            <div>
                                <h2 className="text-4xl font-bold">30,000+</h2>
                                <p className="text-sm opacity-65">
                                    Happy Customers
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <img src="/brand.png" alt="Brands" className="w-full" />
            </div>

            <div ref={shopRef} className="px-6 lg:px-16 mt-10">
                <h2 className="text-center text-3xl font-bold">ALL CLOTHES</h2>
                <div className="border-b mt-3 mb-8"></div>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products &&
                        products.map((product) => (
                            <ProductCard
                                key={product._id || product.id}
                                product={product}
                            />
                        ))}
                </div>
            </div>

            <div className="h-130 w-230 bg-gray-200 rounded-4xl ms-50 flex flex-col items-center gap-5 justify-center m-10">
                <h2 className="text-3xl font-bold">BROWSE BY DRESS STYLE</h2>
                <div className="flex gap-4">
                    <div
                        className="w-70 h-40 bg-white rounded-2xl bg-cover cursor-pointer hover:shadow-2xl transition"
                        style={{ backgroundImage: "url('/casual.png')" }}
                        onClick={() => {
                            dispatch(filterByCate("casual"));
                            navigate("/filter");
                        }}
                    >
                        <h3 className="font-bold pt-3 pl-2">Casual</h3>
                    </div>
                    <div
                        className="w-100 h-40 bg-white rounded-2xl bg-cover cursor-pointer hover:shadow-2xl transition"
                        style={{ backgroundImage: "url('/formal.png')" }}
                        onClick={() => {
                            dispatch(filterByCate("formal"));
                            navigate("/filter");
                        }}
                    >
                        <h3 className="font-bold pt-3 pl-2 text-white">
                            Formal
                        </h3>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div
                        className="w-100 h-40 bg-white rounded-2xl bg-cover cursor-pointer hover:shadow-2xl transition"
                        style={{ backgroundImage: "url('/party.png')" }}
                        onClick={() => {
                            dispatch(filterByCate("party"));
                            navigate("/filter");
                        }}
                    >
                        <h3 className="font-bold pt-3 pl-2 text-white">
                            Party
                        </h3>
                    </div>
                    <div
                        className="w-70 h-40 bg-white rounded-2xl bg-cover cursor-pointer hover:shadow-2xl transition"
                        style={{ backgroundImage: "url('/gym.png')" }}
                        onClick={() => {
                            dispatch(filterByCate("gym"));
                            navigate("/filter");
                        }}
                    >
                        <h3 className="font-bold pt-3 pl-2 ">Gym</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
