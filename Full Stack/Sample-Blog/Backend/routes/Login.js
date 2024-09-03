const express = require("express");
const router = express.Router();
const User = require("../models/user_schema");
const createToken = require("../auth/jwt");

router.get("/", async (req, res, next) => {
  res.send("login page");
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token);
    res.status(200).send({ message: "user logged in" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
