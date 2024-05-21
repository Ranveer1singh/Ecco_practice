const express = require('express');
const router = express.Router();

const{userProfile, getAllProducts}= require("../controller/UserController");
const{authenticateUser} = require("../middlewares/authMiddleware");

router.get("/profile",authenticateUser,userProfile);
router.get("/all/product",authenticateUser,getAllProducts);

module.exports = router;