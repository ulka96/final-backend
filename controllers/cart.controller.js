import Cart from "../models/cart.model.js"

// Get cart for a user
export const getCart = async (request, response) => {
  try {
    const userId = request.id; 

    const cart = await Cart.findOne({ userId });
    
    console.log(cart)
    if (!cart) {
      return response.status(404).json({ message: "Cart not found" });
    }
    
    response.json(cart);
  } catch (error) {
    response.status(500).json({ message: "Error fetching cart", error });
  }
 
};


// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { product, quantity, material } = req.body;
    // const userId = req.user.id;

    const userId = req.id; 

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, cart: [] });
    }

    const existingItem = cart.cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.cart.push({ product, quantity, material });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Update item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    // const userId = req.user.id;

    const userId = req.id; 

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.cart.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.quantity = quantity;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    // const userId = req.user.id;

    const userId = req.id; 

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.cart = cart.cart.filter((item) => item._id.toString() !== itemId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    // const userId = req.user.id;

    const userId = req.id; 

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.cart = [];
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};
