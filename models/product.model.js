import mongoose from "mongoose";


const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    }, 
    productPic: {
        type: String,
        required: true,
    }, 
    material: {
        type: String,
        required: true, 
    }, 
    quantity: {
        type: Number,
        required: true, 
    },
    color: {
        type: String,
        required: true, 
    },
    rating: {
        type: String,
        required: true, 
    },

    
})


const Product = mongoose.model("Product", ProductSchema)

export default Product
