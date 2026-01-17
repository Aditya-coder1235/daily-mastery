const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
    rate:{
        type:String,
        min:0,
        max:5,
        required: true
    },
    comment:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const Review=mongoose.model('Review',reviewSchema)
module.exports=Review