const Product = require("../models/Product");

// add new  product 
exports.addProduct = async (req, res,) => {
  try {
    const { name, price, category, description } = req.body;
    const images = req.files.map(file => file.path);

    // add new product
    const newProduct = new Product({
      name,
      price,
      category,
      description,
      images,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });

  } catch (err) {
    res.status(500).json({
      message: "internal server error",
      error: err,
    });
  }
};
// update product by id 
exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  // const updateData = req.body;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};