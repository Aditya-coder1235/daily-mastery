const Product = require('../models/productSchema')


exports.createProduct = async (req, res) => {
    try {
        let { name, description, category, price } = req.body;

        let image=req.file;

        if (!name || !description || !category || !price || !image) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const imageUrl=`/uploads/${image.filename}`

        const newProduct = new Product({ name, description, category, price, owner: req.user.id,image:imageUrl })

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

        let products = await Product.find({ owner: userId })

        res.status(200).json({ message: "Product fetched successfully", products })


    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}


exports.updateProduct = async (req, res) => {
    try {
        let { name, description, category, price } = req.body;
        let { id } = req.params

        if (!name || !description || !category || !price) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        await Product.findByIdAndUpdate(id, { name, description, category, price });

        res.status(200).json({ message: "product update successfully" })

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        let { id } = req.params

        await Product.findByIdAndDelete(id)

        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}