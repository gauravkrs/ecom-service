const Razorpay = require("razorpay");
const { verifyPaymentWebhook } = require("../controllers/paymentController");
require("dotenv").config();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

   async function createOrder(amount, currency, receipt, notes) {
    try {
        const orderOption = {
          amount: amount * 100,
          currency,
          receipt,
          notes,
        };
        const order = await razorpay.orders.create(orderOption);
        return order;
      } catch (error) {
        console.log("Error while creating payment order:", error);
        throw error;
      }
  }
  
  function verifyPayment(body, signature){
    const generatedSignature = razorpay.webhooks.generatedSignature(
      JSON.stringify(body)
    );
    return generatedSignature === signature;
  };

  async function refund(paymentId, amount){
      try {
        const refund = await razorpay.payments.refund(paymentId,{ amount : amount * 100 });
        return refund
      } catch (error) {
        console.log("Error while creating refund amount:", error);
        throw error;
      }
  }


module.exports = {createOrder, verifyPayment, refund};
