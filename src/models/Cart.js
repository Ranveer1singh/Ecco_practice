const mongoose = require("mongoose");
const { trim } = require("validator");

const CartItemSchema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
        trim : true
    },
    quantity:{
        type:Number,
           required:true,
           default :1
    }
});
module.exports = CartItemSchema;

const CartSchema = new mongoose.Schema({
    UserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    items:[CartItemSchema]
});

module.exports = mongoose.model("Cart",CartSchema)