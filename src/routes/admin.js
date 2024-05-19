const express = require('express');
const router = express.Router();

const {addProduct} = require("../controller/adminControllers")
const {isAdmin} = require("../middlewares/isAdmin");
const {authenticateUser} = require("../middlewares/authMiddleware");

// admin access route only
router.post("/new/product",authenticateUser,isAdmin,addProduct);

module.exports = router;