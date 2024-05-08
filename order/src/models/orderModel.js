// const { Product } = require("../../../product-service/src/models/productModel");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customerId: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
    default: "Pending",
  },
  totalPrice: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports =  Order ;
