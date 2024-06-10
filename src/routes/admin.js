const express = require('express');
const router = express.Router();
const upload = require("../config/multer");
const {addProduct, updateProduct, deleteProduct} = require("../controller/adminControllers")
const {isAdmin} = require("../middlewares/isAdmin");
const {authenticateUser} = require("../middlewares/authMiddleware");

// admin access route only
// routes/productRoutes.js
router.post("/new/product",authenticateUser,isAdmin,upload.array('images', 5),addProduct);
router.put('/update/product/:id', authenticateUser, isAdmin, updateProduct);
router.delete('/delete/product/:id', authenticateUser, isAdmin, deleteProduct);
// image update also require



module.exports = router;