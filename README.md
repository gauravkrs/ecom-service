# Ecommerce
 
Welcome to the Microservice project! This guide will walk you through setting up and running the microservices locally on your machine.

# Table of Contents
<br> Overview 
<br> Installation
<br> Configuration
<br> Running the Microservices
<br> Testing
<br> Deployment
<br> Contributing
<br> License

# Overview
The Microservice project is a collection of services designed to handle user authentication, product management, and order processing in an e-commerce application.

# Prerequisites
Before getting started, ensure you have the following installed:
<br> Node.js (version 12 or higher)
<br> MongoDB
<br> Git

# Installation
<br> Clone the repository:
bash
Copy code
git clone https://github.com/your-username/microservice-project.git
Navigate to the project directory:
bash
Copy code
cd microservice-project
Install dependencies for each microservice:
bash
Copy code
cd user-auth-service
npm install
Repeat this step for product-service and order-service.
# Configuration
Create a .env file in each microservice directory (e.g., user-auth-service, product-service, order-service) based on the provided .env.example file.For example:
# user-auth-service/.env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user_auth_db
JWT_SECRET=your_jwt_secret

# product-service/.env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/product_db
BASE_URL=http://localhost:3003/api/v1

# order-service/.env
PORT=3002
MONGODB_URI=mongodb://localhost:27017/order_db
BASE_URL=http://localhost:3003/api/v1

# Running the Microservices
Start each microservice in separate terminal tabs/windows:
bash
cd user
npm start
bash
cd product
npm start
bash
cd order
npm start
Ensure each microservice is running on its specified port (e.g., http://localhost:3003 for user-auth-service).
# Testing
Run unit tests for each microservice:
bash
cd user
npm test
Repeat this step for product-service and order-service.
For integration tests, update the .env.test file and run:
bash
cd user
npm run test
Repeat this step for product-service and order-service.
