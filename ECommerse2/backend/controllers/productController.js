const Product=require('../models/product');
const User=require('../models/user');

exports.createProduct=async(req,res)=>{
    try {
        let { name, description,price,category}=req.body;

        console.log()

        if(!name || !description || !price || !category){
            return res.status(400).json({message:"All fields are required"});
        }

        const newProduct = new Product({ name, description, price, category, owner: req.user.id })

        await newProduct.save()

        res.status(200).json({message:"Product created successfully"})
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

exports.getAllProduct = async (req, res) => {
    try {

        let products=await Product.find()

        res.status(200).json({ products })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getById = async (req, res) => {
    try {

        let {id}=req.params

        let product=await Product.findById(id).populate('owner')

        res.status(200).json({message:"Product fetched successfully",product})

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getProductByUserId = async (req, res) => {
    try {
        const userId = req.user.id;

        const products = await Product.find({ owner: userId });

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



exports.updateProduct = async (req, res) => {
    try {
        let { name, description, price, category } = req.body;
        let {id}=req.params

        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        await Product.findByIdAndUpdate(id,{name,description,price,category})

        res.status(200).json({message:"Product update successfully"})

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        let {id}=req.params

        await Product.findByIdAndDelete(id)

        res.status(200).json({ message: "Product deleted successfully" })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}