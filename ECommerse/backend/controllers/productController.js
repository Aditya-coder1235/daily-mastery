const Product=require('../models/productSchema')

exports.create=async(req,res)=>{
    try {
        let {title,description,price}=req.body;
        let image=req.file

        if(!image){
            return res.status(400).josn({message:"Image is required"});
        }

        const imageUrl=`/uploads/${image.filename}`

        const newProduct=new Product({title,description,price,owner:req.user.id,image:imageUrl})

        await newProduct.save()

        res.status(200).json({message:"Product create successfully",product:newProduct})
        
    } catch (error) {
        res.status(400).json({message:"Error during create product"})
    }
}

// exports.getByQuery=async(req,res)=>{
//     try {
//         const { search } = req.query;
//         const query = search
//             ? { name: { $regex: search, $options: "i" } }
//             : {};
//         const product = await Product.find(query).limit(10);
//         res.json(product);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

exports.getAll = async (req, res) => {
    try {
        let products=await Product.find()

        res.status(200).json({message:"allproduct fetched",products:products})

    } catch (error) {
        res.status(400).json({ message: "Error during getAll product" })
    }
}


exports.getById = async (req, res) => {
    try {
        let {id}=req.params;

        let product = await Product.findById(id).populate('reviews')

        res.status(200).json({message:"product fetch success", product:product});

    } catch (error) {
        res.status(400).json({ message: "Error during getById product" })
    }
}


exports.updateById = async (req, res) => {
    try {
        let {id}=req.params;
        let {title,description,price}=req.body;

        let updatedProduct=await Product.findByIdAndUpdate(id,{title,description,price});

        res.status(200).json({message:"product update successfully"})

    } catch (error) {
        res.status(400).json({ message: "Error during update product" })
    }
}


exports.deleteById = async (req, res) => {
    try {
        let {id}=req.params;

        await Product.findByIdAndDelete(id)

        res.status(200).json({message:"product delete success"});

    } catch (error) {
        res.status(400).json({ message: "Error during delete product" })
    }
}