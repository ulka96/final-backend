import express from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "../controllers/cart.controller.js"
import {protectRoute} from "../middlewares/protectRoute.js"

const router = express.Router();

router.get("/", protectRoute, getCart); // Get user's cart
router.post("/add", protectRoute, addToCart); // Add item to cart
router.patch("/update", protectRoute, updateCartItem); // Update cart item quantity
router.delete("/remove", protectRoute, removeFromCart); // Remove item from cart
router.delete("/clear", protectRoute, clearCart); // Clear cart


export default router;