const { Product } = require('../../../product-service/src/models/productModel');
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const inventorySchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

  
const Inventort = mongoose.model('Order', inventorySchema);

module.exports = Inventort