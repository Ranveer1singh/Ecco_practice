const express = require('express');
const router = express.Router();

const{userProfile}= require("../controller/UserController");
const{authenticateUser} = require("../middlewares/authMiddleware");

router.get("/profile",authenticateUser,userProfile);

module.exports = router;