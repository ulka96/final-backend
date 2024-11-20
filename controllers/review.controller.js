import Review from "../models/review.model.js"; // Import Review Schema
import Rating from "../models/rating.model.js"; // Import Rating Schema
import User from "../models/user.model.js";    // Import User Schema

// Add a review
export const addReview = async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;

    // Ensure a rating exists in the database
    const existingRating = await Rating.findOne({ userId, productId });
    if (!existingRating) {
      return res.status(400).json({ message: "Rating must exist before adding a review" });
    }

    // Create a new review
    const newReview = new Review({
      productId,
      userId,
      rating: existingRating._id,
      comment,
    });

    await newReview.save();
    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
};

// Get all reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId })
      .populate("userId", "userName profilePic") // Populate username and profile pic
      .populate("rating", "rating"); // Populate the rating value

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};

// Get a single review
export const getSingleReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId)
      .populate("userId", "userName profilePic")
      .populate("rating", "rating");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch review", error: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review", error: error.message });
  }
};
