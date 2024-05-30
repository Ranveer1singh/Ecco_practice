// MOdels
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

// Middlewares 
const authUser = require("../middlewares/authMiddleware");

// controllers

// UserProfile
exports.userProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Validate the user ID
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Fetch the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's profile data
    res.status(200).json({
      data: {
        // id: user._id,
        name: user.name,
        email: user.email,
        // Include any other necessary fields
      },
      message: "User found successfully",
    });
  } catch (err) {
    console.error("Error fetching user profile:", err); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" });
  }
};

// All Products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    const totalProducts = await Product.countDocuments({});

    res.status(200).json({
      totalProducts,
      products,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

// Add Product To Cart
exports.addProductToCart = async (req, res, next) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;
 // Ensure quantity is a number and has a default value of 1 if not provided
 const parsedQuantity = quantity !== undefined ? parseInt(quantity, 10) : 1;

 if (isNaN(parsedQuantity)) {
   return res.status(400).json({
     message: "Invalid quantity value",
   });
 }
  try {
    let cart = await Cart.findOne({ UserId: userId });

    if (!cart) {
      cart = new Cart({
        UserId: userId,
        items: [
          {
            product: productId,
            quantity:parsedQuantity,
          },
        ],
      });
      await cart.save(); // Ensure new cart is saved
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += parsedQuantity;
      } else {
        cart.items.push({
          product: productId,
          quantity : parsedQuantity,
        });
      }
      await cart.save(); // Save the updated cart
    }

    res.status(201).json({
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

exports.getCartDetails = async (req, res) => {
  const UserId = req.user.userId;

  try {
    const cart = await Cart.findOne({UserId})
    .populate({
      path:"items.product"
    });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};