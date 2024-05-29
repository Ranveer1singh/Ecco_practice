const express = require('express');
const router = express.Router();
const upload = require("../config/multer");
const {addProduct, updateProduct, deleteProduct} = require("../controller/adminControllers")
const {isAdmin} = require("../middlewares/isAdmin");
const {authenticateUser} = require("../middlewares/authMiddleware");

// admin access route only
router.post("/new/product",authenticateUser,isAdmin,upload.array('images', 5),addProduct);
// routes/productRoutes.js
router.put('/update/product/:id', authenticateUser, isAdmin, updateProduct);
router.delete('/delete/product/:id', authenticateUser, isAdmin, deleteProduct);

module.exports = router;