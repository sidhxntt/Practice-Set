const express = require("express");
const router = express.Router();
const User = require("../models/user_schema");

router.post("/", async (req, res, next) => {
    try {
      const { token } = req.body;
      const user = await User.findOne({ resetToken: token });
  
      if (!user) {
        return res.status(400).json({ error: "Invalid OTP" });
      }
      if (user.resetToken !== token) {
        return res.status(400).json({ error: "Invalid OTP" });
      }
      if (user.expiry_of_Token < Date.now()) {
        return res.status(400).json({ error: "OTP expired" });
      }
  
      res.status(200).json({ message: "OTP verified" });
    } catch (error) {
      console.error("Internal Server Error:", error); // Log the error
      next(error);
    }
  });
  
module.exports = router;
