const express = require('express');
const router = express.Router();

const {addProduct} = require("../controller/adminControllers")
const {isAdmin} = require("../middlewares/isAdmin");

// admin access route only
router.post("/new/product",isAdmin,addProduct);

module.exports = router;