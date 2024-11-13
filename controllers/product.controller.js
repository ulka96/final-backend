import Product from "../models/product.model.js"
import Color from "../models/color.model.js"

//Get all products
export const getProducts = async (request, response) => {
    const products = await Product.find()
    if (!products) return response.status(404).send({ error: "Something Went wrong" })
    return response.status(200).send(products)
}

//get a single product
export const getSingleProduct = async (request, response) => {
    const { productId } = request.params
    const singleproduct = await Product.findById(productId)
    if (!singleproduct) return response.status(404).send({ error: "Something went wrong" })
    return response.status(200).send(singleproduct)
}

//add a single product
export const addSingleProduct = async (request, response) => {

  const {
        title,
        price,
        discountedPrice,
        discount,
        newArrival,
        category,
        slug,
        sku,
        description,
        color,
        material,
        rating,
        quantity
    } = request.body;
    
    const productPic = request.file ? request.file.path : null;

    // Check if the image was uploaded
    if (!productPic) {
        return response.status(400).json({ error: "Product image is required" });
    }

    // Check for empty required fields
    if (!title || !price || !discountedPrice || !discount || !category || !slug || !sku || !description || !color || !material || !quantity || !rating) {
        return response.status(400).json({ error: "Please fill all required fields" });
    }

    try {
        // Check if a product with the same SKU already exists
        const existingProduct = await Product.findOne({ sku });
        if (existingProduct) {
            return response.status(400).json({ error: "Product with this SKU already exists" });
        }

        // Create a new product
        const newProduct = await Product.create({
            title,
            price,
            discountedPrice,
            discount,
            newArrival,
            category,
            slug,
            sku,
            description,
            color,
            material,
            rating,
            quantity,
            productPic
        });

        return response.status(201).json(newProduct);
    } catch (error) {
        return response.status(500).json({ error: "Server error" });
    }
};


// Delete product
export const deleteProduct = async (request, response) => {
    const { productId } = request.params;
  
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return response.status(404).send({ message: "Product not found" });
      }
  
      response.status(200).send({ deletedProduct });
    } catch (error) {
      response.status(500).send({ error });
    }
};
  
// Edit product

export const updateProduct = async (req, res) => {
    const { productId } = req.params;
    try {
      // Check if a new image file was uploaded
      const updatedData = req.body;
      if (req.file) {
        updatedData.productPic = req.file.path; // Set the path for the new image
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
        new: true,
      });
  
      if (!updatedProduct) {
        return res.status(404).send({ message: "Product not found" });
      }
  
      res.status(200).send({ updatedProduct });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  