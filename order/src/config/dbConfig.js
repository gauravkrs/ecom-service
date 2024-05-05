const mongoose = require('mongoose');
require('dotenv').config();

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

async function connectToDatabase() {
    try {
      await mongoose.connect(DB_CONNECTION_STRING, {
        useNewUrlParser: true,
      });
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
}

module.exports = { connectToDatabase }