const Product = require('../models/product');

exports.home = async (req, res) => {
    const allProducts = await Product.find().populate('owner');
    res.render('home', { allProducts });
};

exports.getUpload = (req, res) => {
    res.render('upload');
};

exports.postUpload = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        if (!name || !description || !price) {
            return res.render('upload', { error: 'All fields are required' });
        }

        await Product.create({
            name,
            description,
            price,
            owner: res.locals.user.id
        });

        res.redirect('/');
    } catch (err) {
        res.render('upload', { error: 'Something went wrong' });
    }
};

exports.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('owner');
    res.render('product', { product });
};

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/');
};

exports.getUpdate = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('update', { product });
};

exports.updateProduct = async (req, res) => {
    const { name, description, price } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
        name,
        description,
        price
    });
    res.redirect('/');
};
