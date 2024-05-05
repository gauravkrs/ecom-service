const { Product } = require('../../../product-service/src/models/productModel');
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        productStatus: { type: String, enum: ['InStock', 'OutOfStock'], default: 'InStock' },
      },
    ],
    status: { type: String, enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'], default: 'Pending' },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {Order, Product}