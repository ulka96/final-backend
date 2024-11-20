import express from "express";
import {
  addReview,
  getProductReviews,
  getSingleReview,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

// Route to add a review
router.post("/", addReview);

// Route to get all reviews for a product
router.get("/:productId", getProductReviews);

// Route to get a single review by ID
router.get("/single/:reviewId", getSingleReview);

// Route to delete a review
router.delete("/:reviewId", deleteReview);

export default router;
