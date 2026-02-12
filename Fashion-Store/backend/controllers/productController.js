const Product = require('../models/productSchema')


exports.createProduct = async (req, res) => {
    try {
        let { name, description, category, price } = req.body;

        let image = req.file;

        if (!name || !description || !category || !price || !image) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const imageUrl = `/uploads/${image.filename}`

        const newProduct = new Product({ name, description, category, price, owner: req.user.id, image: imageUrl })

        await newProduct.save()

        res.status(201).json({ message: "Product created Successfully" })

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}


exports.getAllProduct = async (req, res) => {
    try {

        let products = await Product.find()

        res.status(200).json({ message: "Product fetched successfully", products })

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}


exports.getProductById = async (req, res) => {
    try {
        let { id } = req.params;

        let product = await Product.findById(id)

        res.status(200).json({ message: "Product fetched successfully", product })

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}


exports.getProductForUser = async (req, res) => {
    try {
        let { userId } = req.params

        let products = await Product.find({ owner: req.user.id })

        res.status(200).json({ message: "Product fetched successfully", products })


    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}


exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, price } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (category) product.category = category;
        if (price) product.price = price;

        if (req.file) {
            product.image = `/uploads/${req.file.filename}`;
        }

        await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};



exports.deleteProduct = async (req, res) => {
    try {
        let { id } = req.params

        await Product.findByIdAndDelete(id)

        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}