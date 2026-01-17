import React from 'react'
import { removeFromCart,clearCart } from '../features/cartSlice'
import { useDispatch,useSelector } from 'react-redux'

const Cart = () => {
  const dispatch=useDispatch()
  const products=useSelector((state)=>state.cart.items)
  const totalPrice=products.reduce((accumulator, product)=>accumulator+product.price,0)
//   console.log(totalProce);

  return (
      <div className="mt-20 max-w-5xl mx-auto px-4 mb-20 cart">
          <h2 className="text-3xl font-bold mb-5 text-gray-800">Your Cart </h2>
          <span className="text-2xl font-bold mb-5 text-gray-800">
              Total Amount:- <span className='text-red-600'>{totalPrice}</span>
          </span>

          {products.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                  Your cart is empty 🛒
              </p>
          ) : (
              <>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5">
                      {products.map((product) => (
                          <>
                              <div
                                  key={product._id}
                                  className="bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition p-5 flex justify-between"
                              >
                                  <div>
                                      <h3 className="text-lg font-semibold text-gray-800">
                                          {product.title}
                                      </h3>

                                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                          {product.description}
                                      </p>

                                      <p className="text-xl font-bold text-blue-600 mt-4">
                                          ₹{product.price}
                                      </p>

                                      <button
                                          onClick={() =>
                                              dispatch(
                                                  removeFromCart(product._id)
                                              )
                                          }
                                          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition w-20"
                                      >
                                          Remove
                                      </button>
                                  </div>

                                  <div className=" ms-3">
                                      <img
                                          src={`http://localhost:8080${product.image}`}
                                          alt={product.title}
                                          className="w-full h-full object-cover rounded-2xl"
                                      />
                                  </div>
                              </div>
                          </>
                      ))}
                  </div>

                  <div className="flex justify-end mt-10">
                      <button
                          onClick={() => dispatch(clearCart())}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                      >
                          Clear Cart
                      </button>
                  </div>
              </>
          )}
      </div>
  );
}

export default Cart