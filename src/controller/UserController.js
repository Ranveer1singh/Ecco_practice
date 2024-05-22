const User = require("../models/User");
const authUser = require("../middlewares/authMiddleware");
const Product = require("../models/Product");
const Cart = require("../models/Cart")
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
exports.addProductToCart = async (req,res,next) =>{
  try{
    const userId = req.user.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity || 1;

    // find product
    const product = await Product.findById(productId);

    if(!product){
      return res.status(404).json({
       message: "product not found"
      })
    }

    let cart = await Cart.findOne({user : userId});
    if(!cart){
     cart = new Cart({
      user:userId,
      items:[],
     })
    }

    const existingItem = cart.items.find(item => item.product.tostring() === productId);
    if(existingItem){
      existingItem.quantity += quantity
    }else{
      cart.items.push({
          product : productId,quantity
      })
    }
    await cart.save();

    res.status(201).json({
      message : "product added to cart ",
      data:cart
    })
  }catch(error){
    res.status(500).json({
      message:"internal server Error ",
      Error : error
    });
  };
};
