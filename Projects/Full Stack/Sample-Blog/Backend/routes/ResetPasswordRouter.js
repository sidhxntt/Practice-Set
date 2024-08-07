const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user_schema");

router.get("/", async (req, res, next) => {
  try {
    res.status(200).send("RESET-PASSWORD");
  } catch (error) {
    next(error);
  }
});
router.put("/", async (req, res, next) => {
  try {
    const { email, confirm_password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "No User Found" });
    }

    // Check if the new password is the same as the current password
    const isSamePassword = await bcrypt.compare(confirm_password, user.password);
    if (isSamePassword) {
      return res.status(400).json({ error: "New password cannot be the same as the current password" });
    }

    // Update the user's password
    user.password = confirm_password;
    await user.save();

    console.log("Password Reset");
    res.status(200).json({ message: "Password Reset" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    next(error);
  }
});
module.exports = router;
