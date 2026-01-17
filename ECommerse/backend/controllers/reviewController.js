const Review=require('../models/reviewSchema')
const Product=require('../models/productSchema')

exports.createReview=async(req,res)=>{
    try {
        let {rate,comment}=req.body
        let {id}=req.params
        console.log(req.user)
        const newReview = new Review({ rate, comment, owner: req.user.id});

        let product=await Product.findById(id)
        product.reviews.push(newReview)
        await product.save()

        await newReview.save()

        res.status(200).json({message:"Review Created successfully"});
        
    } catch (error) {
        res.status(400).json({message:"Error during creating review"})
    }
}