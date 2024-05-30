const express = require('express');
const router = express.Router();

const{userProfile, getAllProducts, addProductToCart, getCartDetails}= require("../controller/UserController");
const{authenticateUser} = require("../middlewares/authMiddleware");

router.get("/profile",authenticateUser,userProfile);
router.get("/all/product",authenticateUser,getAllProducts);
router.post("/add-to-cart",authenticateUser,addProductToCart);
router.get("/get-cart/",authenticateUser,getCartDetails);
module.exports = router;