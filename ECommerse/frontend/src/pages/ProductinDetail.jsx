import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import { useDispatch } from "react-redux";

const ProductinDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const [rate, setRate] = useState("");
    const [comment, setComment] = useState("");

    async function fetchProductById() {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/product/getById/${id}`
            );
            setProduct(res.data.product);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProductById();
    }, [id]);

    if (!product) {
        return <div className="mt-10 text-center">Loading...</div>;
    }

    async function createReview() {
        try {
            let res = await axios.post(
                `http://localhost:8080/api/review/create/${id}`,
                { rate, comment },
                { withCredentials: true }
            );
        } catch (error) {
            console.error(error);
        }
    }

    const handleReviewForm = (e) => {
        e.preventDefault();
        createReview();
        setRate("");
        setComment("");
    };

    // console.log(/)

    return (
        <div className="mt-24 detail px-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
                View Product In Details
            </h1>

            <div className="max-w-3xl mx-auto bg-gray-100  rounded-2xl shadow-lg p-8 mb-20 flex gap-40 main">
                <div className="detail-div">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        {product.title}
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6">
                        {product.description}
                    </p>

                    <p className="text-3xl font-bold text-blue-600 mb-8">
                        ₹{product.price}
                    </p>

                    <button
                        onClick={() => dispatch(addToCart(product))}
                        className="w-30 bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-xl transition duration-300"
                    >
                        Add to Cart
                    </button>
                </div>

                <div className="detail-image-div">
                    <img
                        src={`http://localhost:8080${product.image}`}
                        alt={product.title}
                        className="w-[90%] h-full object-cover rounded-2xl detail-image"
                    />
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">
                    Leave Review
                </h3>
                <div className="max-w-3xl mx-auto bg-gray-100  rounded-2xl shadow-lg p-8 mb-20 flex gap-40 main">
                    <form
                        onSubmit={handleReviewForm}
                        className="flex items-center"
                    >
                        <div>
                            <input
                                type="number"
                                placeholder="Give your rating between 1 to 5..."
                                min={1}
                                max={5}
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                className="border w-96 mb-5 h-10 rounded p-2"
                            />
                            <textarea
                                type="text"
                                placeholder="Enter Comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="border w-96 mb-5"
                            />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
                    All Reviews
                </h2>
                <div className="max-w-3xl mx-auto bg-gray-100   rounded-2xl shadow-lg p-8 mb-20 flex gap-5 main flex-wrap">
                    {product.reviews.map((review) => {
                        return (
                            <div className="bg-white shadow rounded p-5">
                                <h4>{review.rate} ⭐</h4>
                                <p>{review.comment}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductinDetail;
