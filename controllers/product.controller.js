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
    console.log(request.body);
    console.log(request.file);

    const {
        title,
        price,
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
    if (!title || !price || !category || !slug || !sku || !description || !color || !material || !quantity || !rating) {
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
