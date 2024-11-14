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
    discountedPrice: {
        type: Number,
        required: true,
    },
    discount: {
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
        type: Array,
        required: true, 
    },
    rating: {
        type: String,
        required: true, 
    },
    newArrival: {
        type: Boolean,
        required: false,
      },

})


const Product = mongoose.model("Product", ProductSchema)

export default Product
