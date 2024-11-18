import Product from "../models/product.model.js";

export const addRating = async (req, res) => {
    const { productId, rating, comment, userId } = req.body; // Assume userId is sent in request body
  
    try {
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Add new rating
      product.ratings.push({
        user: userId, // Use userId from request body
        rating,
        comment,
      });
  
      await product.save();
      return res.status(200).json({ message: "Rating added successfully", product });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  


export const getProductRating = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const averageRating =
            product.ratings.length > 0
                ? product.ratings.reduce((acc, rating) => acc + rating.rating, 0) / product.ratings.length
                : 0;

        res.status(200).json({ averageRating, ratings: product.ratings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
