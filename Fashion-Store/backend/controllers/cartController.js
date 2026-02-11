const User=require('../models/userSchema');
const Product=require('../models/productSchema');

exports.addToCart = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID required" });
        }

        const user = await User.findById(req.user.id);

        user.cart.push({ product: productId });

        await user.save();

        res.status(200).json({
            message: "Added to cart",
            cart: user.cart
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
};


exports.fetchCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("cart.product");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ cart: user.cart });


    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
}

exports.deleteFormCart = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);
        user.cart = user.cart.filter(
            item => item.product.toString() !== req.params.productId
        );

        await user.save();

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
}

exports.clearCart = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        user.cart = []; 

        await user.save();

        res.status(200).json({
            message: "Cart cleared successfully",
            cart: user.cart
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
}