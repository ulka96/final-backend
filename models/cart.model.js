import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  material: { type: String },
  product: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String },
    category: { type: String },
    productPic: { type: String },
  },
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cart: [cartItemSchema],
});

export default mongoose.model("Cart", cartSchema)
