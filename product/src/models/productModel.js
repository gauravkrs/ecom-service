const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String },
  category: { type: String, required: true },
  inventory: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
