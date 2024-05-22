const mongoose = require("mongoose");
const Product = require("./Product");

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"  
    },
    items: [
        {
            Product:{
                type : mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
            ,
            quantity:{
                type:Number,
                default:1
            }
        }
    ]
});

module.exports = mongoose.model("Cart",cartSchema)