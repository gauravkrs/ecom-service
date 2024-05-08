const express = require('express');
const orderController = require('../controllers/orderController')
const paymentController = require('../controllers/paymentController')
const router = express.Router();

router.post('/productOrder', orderController.createOrder)
router.post('/payment', paymentController.paymentOrder)
router.post('/webhooks', paymentController.verifyPaymentWebhook)

module.exports = router