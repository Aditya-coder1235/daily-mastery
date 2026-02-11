import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductInDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const [review, setReview] = useState([]);
    const [write, setWrite] = useState(false);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/product/getById/${id}`,
            );
            setProduct(res.data.product);
        } catch (err) {
            console.error("Fetching product error", err);
            setError("Failed to load product");
        } finally {
            setLoading(false);
        }
    };

    const createReviews = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8080/api/review/create",
                {
                    rating,
                    comment,
                    productId: id,
                },
                { withCredentials: true },
            );
            // console.log(res.data);
            fetchReviews();

        } catch (err) {
            console.error("Creating review error", err);
        }
    };

    const fetchReviews = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/review/getAll/${id}`,
            );
            setReview(res.data.reviews);
            // console.log();
        } catch (err) {
            console.error("Creating review error", err);
        }
    };

    const deleteReviews = async (reviewId) => {
        try {
            const res = await axios.delete(
                `http://localhost:8080/api/review/delete/${reviewId}`,{withCredentials:true}
            );
            // setReview(res.data.reviews);
            console.log(res.data);
            fetchReviews()
        } catch (err) {
           console.error(
               "Delete review error:",
               err.response?.data || err.message,
           );
        }
    };

    const addToCart = async (productId) => {
        try {
            const res = await axios.post(
                `http://localhost:8080/api/cart/add/`,
                 {productId} ,
                {withCredentials:true}
            );
            // setReview(res.data.reviews);
            console.log(res.data);
        } catch (err) {
            console.error("Creating review error", err);
        }
    };

    // const handleOnChange = (e) => {
    //     let { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    const handleOnWrite = () => {
        setWrite(!write);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        createReviews();
    };

    useEffect(() => {
        fetchProduct();
        fetchReviews();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    // console.log(review);

    const userId = localStorage.getItem("userId");

    return (
        <div>
            <div className="max-w-6xl mx-auto p-10 grid grid-cols-2 gap-10">
                <div className="w-full h-112.5 rounded-xl overflow-hidden">
                    <img
                        src={`http://localhost:8080${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                    <p className="text-gray-600 mb-4">{product.description}</p>

                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-yellow-400 text-lg">
                            ★ ★ ★ ★ ☆
                        </span>
                        <span className="text-gray-500">(4.0)</span>
                    </div>

                    <div className="mb-6">
                        <span className="text-2xl font-bold text-black">
                            ₹{product.price}
                        </span>
                        {product.originalPrice && (
                            <span className="text-gray-500 line-through ml-3">
                                ₹{product.originalPrice}
                            </span>
                        )}
                    </div>

                    <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition" onClick={()=>addToCart(product._id)}>
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* //reviews */}
            <div className="mb-10 ">
                <p className="border-b w-270 ms-40"></p>
                <button
                    className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition ms-270 mt-5"
                    onClick={handleOnWrite}
                >
                    Write a Review
                </button>
                {write && (
                    <div className="max-w-xl mx-auto mt-5 bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Write a Review
                        </h2>

                        <form onSubmit={handleOnSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Rating (1–5)
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    max={5}
                                    placeholder="Enter rating"
                                    name="rating"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Comment
                                </label>
                                <textarea
                                    name="comment"
                                    placeholder="Share your experience..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 
                           resize-none focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded-lg 
                       hover:bg-gray-800 transition font-medium"
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>
                )}

                <h2 className="ms-48 text-2xl font-semibold">
                    All Reviews ({review.length})
                </h2>

                <div className="max-w-6xl mx-auto p-10 grid grid-cols-2 gap-6">
                    {review.map((review) => (
                        <div
                            key={review._id}
                            className="border rounded-2xl p-6 flex justify-between gap-6 bg-white shadow-sm"
                        >
                            <div className="flex flex-col gap-2 wrap-break-word max-w-[75%]">
                                <h3 className="text-sm">
                                    <span className="text-gray-500">
                                        Rating:
                                    </span>{" "}
                                    {review.rating} ⭐
                                </h3>

                                <h2 className="text-sm">
                                    <span className="text-gray-500">User:</span>{" "}
                                    <span className="font-semibold">
                                        {review.user.name}
                                    </span>
                                </h2>

                                <p className="text-sm text-gray-600 wrap-break-word">
                                    {review.comment}
                                </p>
                            </div>
                            {userId === review.user._id && (
                                <button
                                    className="self-end bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                                    onClick={() => deleteReviews(review._id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductInDetail;
