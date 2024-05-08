const express = require('express');
const orderController = require('../controllers/orderController')
const paymentController = require('../controllers/paymentController')
const {verifyUser} = require('../middelware/verifyUser')
const router = express.Router();

router.use(verifyUser)
router.post('/productOrder', orderController.createOrder)
router.post('/payment', paymentController.paymentOrder)
router.post('/webhooks', paymentController.verifyPaymentWebhook)

module.exports = router
