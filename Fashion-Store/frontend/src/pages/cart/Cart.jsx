import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash } from "lucide-react";

const Cart = () => {
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/cart/get", {
                withCredentials: true,
            });
            setCart(res.data.cart);
        } catch (err) {
            console.error("Fetch cart error", err);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            let res = await axios.delete(
                `http://localhost:8080/api/cart/remove/${productId}`,
                { withCredentials: true },
            );
            console.log(res.data);
            fetchCart();
        } catch (err) {
            console.error("Remove cart error", err);
        }
    };

    const clearCart = async () => {
        try {
            await axios.delete("http://localhost:8080/api/cart/clear", {
                withCredentials: true,
            });

            fetchCart(); // refresh UI
        } catch (err) {
            console.error("Clear cart error", err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const subtotal = cart.reduce((sum, item) => sum + item.product.price, 0);
    // console.log(subtotal)
    const discount = subtotal >= 2000 ? subtotal * 0.1 : 0;
    const total = subtotal - discount;

    return (
        <div className="max-w-5xl mx-auto p-10 flex gap-5">
            <div className="">
                <h1 className="text-2xl font-bold mb-6">YOUR CART</h1>
                <div className="border rounded-2xl w-170">
                    {cart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <div className="">
                            {cart.map((item, index) => (
                                <div className="flex flex-col ">
                                    <div
                                        key={index}
                                        className="flex items-center gap-6  p-4 rounded-lg"
                                    >
                                        <img
                                            src={`http://localhost:8080${item.product.image}`}
                                            alt={item.product.name}
                                            className="w-24 h-24 object-cover rounded"
                                        />

                                        <div className="flex-1">
                                            <h2 className="font-semibold">
                                                {item.product.name}
                                            </h2>

                                            <p className="text-gray-600">
                                                ₹{item.product.price}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() =>
                                                removeFromCart(item.product._id)
                                            }
                                            className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-600 transition"
                                        >
                                            <Trash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={clearCart}
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition mb-5 mt-5 ms-5"
                >
                    Clear Cart
                </button>
            </div>

            <div className="border w-full rounded-2xl h-fit mt-14 p-6">
                <h2 className="text-xl text-center font-semibold mb-6">
                    Order Summary
                </h2>

                <div className="flex justify-between mb-3 text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between mb-3 text-green-600">
                    <span>Offer (10% OFF)</span>
                    <span>- ₹{discount}</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>

                <button
                    disabled={cart.length === 0}
                    className={`w-full py-3 rounded-lg font-semibold transition
            ${
                cart.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-400 hover:bg-yellow-500"
            }`}
                >
                    Proceed to Checkout
                </button>

                {subtotal < 2000 && cart.length > 0 && (
                    <p className="text-sm text-center text-gray-500 mt-4">
                        Add items worth ₹{2000 - subtotal} more to get 10% OFF
                    </p>
                )}
            </div>
        </div>
    );
};

export default Cart;
