import axios from "axios";

const handlePayment = async (amount) => {
    const orderUrl = "http://localhost:3000/payment-gateway/create-order";
    const { data } = await axios.post(orderUrl, {
      amount,
      currency: "INR",
      receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
    });
    console.log(data)
    const options = {
      key: "rzp_test_g5qkxVLzGguYcs",
      amount: data.amount,
      currency: data.currency,
      name: "Blog.",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        const paymentUrl = "http://localhost:3000/payment-gateway/verify-payment";
        const verifyRes = await axios.post(paymentUrl, {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
        if (verifyRes.data.success) {
          alert("Payment successful");
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: {
        name: "Your Name",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      alert("Payment failed");
    });
    rzp.open();
  };

export {handlePayment}