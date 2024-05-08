const { ResponseMessage } = require("../constants");
const { Order } = require("../models/orderModel");

const createOrder =async (req,res) =>{
    try {
        const { customerName, email, address, products } = req.body;
    
        // Calculate total price based on products and quantities
        const totalPrice = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    
        // Create the order
        const newOrder = await Order.create({
          customerName,
          email,
          address,
          products,
          totalPrice,
        });
    
        res.status(201).json(newOrder);
      } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: ResponseMessage.INTERNAL_SERVER_ERROR });
      }  
}

module.exports = { createOrder }