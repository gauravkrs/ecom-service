const Order = require('../models/orderModel')
const Payment = require('../models/paymentModel')
const { ResponseMessage, Status } = require('../constants')
const PaymentGateway = require('../service/razarpayPayment')

const paymentOrder = async(req, res)=>{
    const {customerId,address, email, price, paymentMethod, productId} = req.body

    const totalPrice = price
    const paymentResult = await PaymentGateway.createOrder(totalPrice, 'INR', 'order_receipt',{customerId});
    const newOrder = await Order.create({
        customerId,
        email,
        address,
        ...productId,
        totalPrice,
        status:"Confirmed",
        razorpayOrderId: paymentResult.id, // Save Razorpay order ID in your database
    });

    res.status(200).send({message:ResponseMessage.PAYMENT_SUCCESSFUL,data:newOrder})
}

const verifyPaymentWebhook = async (req, res) => {
    const body = req.body

    const signature = req.headers['x-razorpay-signature']
    const isSignatureValid = PaymentGateway.verifyPayment(body, signature)

    if(!isSignatureValid){
        return res.status(200).send({ message: 'signature is not valid' })
    }

    try {
        const paymentId = body.payload.paymentId.entity.id;
        const orderId = body.payload.paymentId.entity.order_id;

        const order = await Order.findOne({ razorpayOrderId: orderId });
        if(!order){
            res.status(200).send({ message: ResponseMessage.ORDER_NOT_FOUND });
        }

        if(body.event === 'payment.authorized'){
            order.status = 'Confirmed';
            await order.save()
        }else{
            order.status = Status.FAILED;
            await order.save()
        }

        await Payment.create({
            orderId: order._id,
            paymentMethod: body.payload.payment.entity.method,
            paymentStatus: body.event === 'payment.authorized' ? Status.SUCCESS : Status.FAILED,
            amount: body.payload.payment.entity.amount / 100,
            transactionId: paymentId,
        })
        res.status(200).send({ success: true });
    } catch (error) {
        console.log('Error while verifying payment webhook:', error);
        res.status(500).send({message: ResponseMessage.INTERNAL_SERVER_ERROR})
    }
}

module.exports = { paymentOrder, verifyPaymentWebhook }