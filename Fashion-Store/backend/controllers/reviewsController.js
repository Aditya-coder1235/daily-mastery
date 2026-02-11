const Review = require('../models/reviewsSchema');
const Product=require('../models/productSchema')

exports.createReview = async (req, res) => {
    try {
        let { rating, comment,productId } = req.body

        if (!rating || !comment || !productId) {
            return res.status(400).json({ message: "All Fields Required!" });
        }

        const newReview = new Review({ rating, comment,user:req.user.id ,productId:productId});

        // await Product.findOneAndUpdate()

        await newReview.save()

        res.status(201).json({ message: "review Create Successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}

exports.getAllReviews = async (req, res) => {
    try {
        let {id}=req.params

        let reviews=await Review.find({productId:id}).populate("user")

        res.status(200).json({message:"reviews fetched successfully",reviews})

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}

exports.deleteReviewByUserId=async(req,res)=>{
    try {
        let {reviewId}=req.params;

        let review=await Review.findByIdAndDelete(reviewId)

        // await review.deleteOne()

        // await review.save()

        res.status(200).json({message:"Review delete successffully"})

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}