const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/user_schema");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User with given email doesn't exist");
    }

    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetToken = otp;
    user.expiry_of_Token = Date.now() + 5 * 60 * 1000; // OTP valid for 5 mins
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc;">
                <main style="margin-top: 20px;">
                    <h2 style="color: #333;">Hi ${user.username || 'User'},</h2>
                    <p style="color: #555;">This is your Password Rest code:</p>
                    <div style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
                        ${otp.split('').map(digit => `<span style="display: inline-block; margin-right:10px; padding: 10px; color: #007BFF; font-size: 24px; font-weight: bold;">${digit}</span>`).join('')}
                    </div>
                    <p style="color: #555; margin-top: 20px;">This code will only be valid for the next 5 minutes. If the code does not work, you can use this login verification link:</p>
                       <a style="cursor: pointer" href="http://localhost:5173/verify-otp"><button style="display: block; width: 100%; padding: 10px; margin-top: 20px; background-color: #007BFF; color: #fff; border: none; border-radius: 5px;">Password Rest</button> </a>
                    <p style="color: #555; margin-top: 20px;">Thanks,<br>Blog. team</p>
                </main>
                <footer style="margin-top: 20px; text-align: center; color: #999;">
                    <p>This email was sent to <a href="#" style="color: #007BFF; text-decoration: none;">${email}</a>. If you'd rather not receive this kind of email, you can <a href="#" style="color: #007BFF; text-decoration: none;">unsubscribe</a> or <a href="#" style="color: #007BFF; text-decoration: none;">manage your email preferences</a>.</p>
                    <p>&copy; ${new Date().getFullYear()} Meraki UI. All Rights Reserved.</p>
                </footer>
             </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error); // Log the error
        return res.status(500).send("Error sending email");
      }
      res.status(200).send("OTP sent to your email");
    });
  } catch (error) {
    console.error("Internal Server Error:", error); // Log the error
    next(error);
  }
});

module.exports = router;
