import {useState} from "react";
import axios from 'axios'
import { useParams } from "react-router";

const UpdateProduct = () => {

    let {id}=useParams()

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("formal");
    const [price, SetPrice] = useState("");
    const [image, setImage] = useState(null);

    const [error, setError] = useState("");

    const updateProduct = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("image", image);

        try {
            let res = await axios.put(
                `http://localhost:8080/api/product/update/${id}`,
                formData,
                {
                    withCredentials: true,
                },
            );

            // navigate("/");
            console.log(res.data);
            setName("");
            setDescription("");
            setImage(null);
            SetPrice("");
            setCategory("");
        } catch (error) {
            console.error("Creating Error", error.response?.data?.message);
            setError(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        updateProduct();
        // setFormData("")
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-5 pb-5">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Update Product
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter product name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows="3"
                        placeholder="Enter product description"
                        className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">
                        Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                        className="w-full px-4 py-2 border rounded-md 
               focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Category
                    </label>
                    <select
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="formal">Formal</option>
                        <option value="gym">Gym</option>
                        <option value="party">Party</option>
                        <option value="casual">Casual</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">
                        Price (₹)
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => SetPrice(e.target.value)}
                        required
                        placeholder="Enter price"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
                {error && (
                    <p className="text-red-600 font-semibold mb-3">{error}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
