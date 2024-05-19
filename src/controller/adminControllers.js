const Product = require("../models/Product");

exports.addProduct = async (req, res, next) => {
  try {
    const { name, price, category, description, images } = req.body;

    // add new product
    const newProduct = new Product({
      name,
      price,
      category,
      description,
      images,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
    
  } catch (err) {
    res.status(500).json({
      message: "internal server error",
      error: err,
    });
  }
};
