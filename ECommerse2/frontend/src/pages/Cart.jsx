import React from "react";
import { removeFromCart, clearCart } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

                {cart.length === 0 ? (
                    <p className="text-gray-500 text-center">
                        Your cart is empty
                    </p>
                ) : (
                    <div className="space-y-4">
                        {cart.map((product) => (
                            <div
                                key={product._id}
                                className="flex items-center justify-between border rounded-lg p-4 hover:shadow transition"
                            >
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {product.category}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="text-green-600 font-semibold">
                                        ₹{product.price}
                                    </span>

                                    <button className="text-red-500 text-sm hover:underline" onClick={()=>dispatch(removeFromCart(product._id))}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="mt-6 flex justify-between items-center border-t pt-4">
                        <button className="text-red-600 hover:underline text-sm" onClick={()=>dispatch(clearCart())}>
                            Clear Cart
                        </button>

                        <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
