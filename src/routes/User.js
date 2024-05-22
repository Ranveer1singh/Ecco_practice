const express = require('express');
const router = express.Router();

const{userProfile, getAllProducts, addProductToCart}= require("../controller/UserController");
const{authenticateUser} = require("../middlewares/authMiddleware");

router.get("/profile",authenticateUser,userProfile);
router.get("/all/product",authenticateUser,getAllProducts);
router.post("/add-to-cart",authenticateUser,addProductToCart);
module.exports = router;