const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    image:{
        type:String,
        required:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
})

const Product=mongoose.model('Product',productSchema)

module.exports=Product