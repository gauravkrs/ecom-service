const Product = require("../models/productModel");


const createProduct = async (req, res) => {
    const { name, price, description, image, category, inventory } = req.body;
    if(!name || !price || !description || !category || !inventory){
        return res.status(400).send({message: "All fields are required"});
    }
    try {
        const product = new Product({ name, price, description, image, category, inventory });
        const newProduct = await product.save();
        res.status(201).send({data: newProduct,message: "Product created successfully"});
    } catch (error) {
        console.log('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).send({data: product})
      } catch (error) {
        console.log('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const updateProductById = async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, category, inventory } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(productId, { name, price, description, image, category, inventory }, { new: true });
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).send({data: product})
      } catch (error) {
        console.log('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const deleteProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).send({data: product})
      } catch (error) {
        console.log('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
const getAllProducts = async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).send({data: product})
    } catch (error) {
        console.log('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { createProduct, getProductById, updateProductById, deleteProductById, getAllProducts }