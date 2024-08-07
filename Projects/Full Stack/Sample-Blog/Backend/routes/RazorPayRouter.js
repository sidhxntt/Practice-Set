const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: 'rzp_test_g5qkxVLzGguYcs',
  key_secret: 'LqzHoHO0R8ycezoyE7N5qbiw'
});

router.post("/create-order", async (req, res) => {
  const { amount, currency, receipt } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in smallest currency unit
      currency,
      receipt,
    });
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac('sha256', 'LqzHoHO0R8ycezoyE7N5qbiw');
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
