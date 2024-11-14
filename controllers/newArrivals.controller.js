import  Product  from "../models/product.model.js";

export const getNewArrivalsAll = async (request, response) => {

  try {
    const products = await Product.find({ newArrival: true });
    response.status(200).send({ products });
  } catch (error) {
    response.status(500).send({ error });
  }
};


export const getSingleNewArrival = async (request, response) => {
    const { productId } = request.params
    const singleproduct = await Product.findById(productId)
    if (!singleproduct) return response.status(404).send({ error: "Something went wrong" })
    return response.status(200).send(singleproduct)
}