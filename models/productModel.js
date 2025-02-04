const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    productName : {
        type: String,
        require : true
    },
    productPrice : {
        type : Number ,
        required : true
    },
    productCategory: {
        type: String,
        required: true,
        enum: ['Accessories', 'Gifts', 'Bags', 'Jewellery', 'Arts', 'Home and Living'],  
        index: true  
    },
    productDescription : {
        type : String,
        required : true,
        maxLength: 10000
    },
    productStory : {
        type : String,
        required : true,
        maxLength: 10000
    },
    productImage: {
        type: String,
        required: true
        
    },
    createdAt :{
        type: Date,
        default: Date.now()
    },
    productQuantity:{
        type: Number,
        required: false,
    }
})

const Product = mongoose.model('products',productSchema)
module.exports = Product;