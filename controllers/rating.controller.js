import Rating from '../models/rating.model.js'; 

// Add a new rating
export const addRating = async (req, res) => {
  try {
    const { userId, productId, rating } = req.body;

    // Check if the user has already rated this product
    const existingRating = await Rating.findOne({ userId, productId });
    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this product.' });
    }

    // Create a new rating
    const newRating = new Rating({ userId, productId, rating });
    await newRating.save();

    return res.status(201).json({ message: 'Rating submitted successfully.', rating: newRating });
  } catch (error) {
    console.error('Error adding rating:', error);
    return res.status(500).json({ message: 'Failed to add rating.', error: error.message });
  }
};

// Get ratings for a product
export const getProductRating = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find all ratings for the product
    const ratings = await Rating.find({ productId });

    // Calculate the average rating
    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
        : 0;

    return res.status(200).json({
      productId,
      ratings,
      averageRating,
      totalRatings: ratings.length,
    });
  } catch (error) {
    console.error('Error fetching product ratings:', error);
    return res.status(500).json({ message: 'Failed to fetch ratings.', error: error.message });
  }
};
