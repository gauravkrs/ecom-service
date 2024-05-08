const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { connectToDatabase } = require('./src/config/dbConfig');
const { default: mongoose } = require('mongoose');
const router = require('./src/routes/orderRoute');
// const router = require('./src/routes/productRoute');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "HEAD, POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Rate Limiter Middleware
const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 30 minutes',
});

app.use('/api/order/', limiter);

app.get("/api/v1/order", (req, res) => {
    res.send("Hello from order processing service!");
});

//Routes
app.use('/api/v1/order', router);

// Error handling middleware - to catch errors globally
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
  
const PORT = process.env.PORT || 3007;
  
//connecting to MongoDB
connectToDatabase().then(() => {
    const db = mongoose.connection.db; // Get the MongoDB database object
    console.log('Connected to MongoDB:', db.databaseName);
  }).catch((err) => {
    console.error('Error connecting to MongoDB in app.js:', err);
  });

//Listening to port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
