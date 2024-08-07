const express = require("express");
const router = express.Router();
const User = require("../models/user_schema")
const { OAuth2Client } = require("google-auth-library");
const createToken = require("../auth/jwt");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.get("/", async (req, res, next) => {
  res.send("OAuth page");
});

router.post("/google-login", async (req, res, next) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: email,
        email,
        name,
      });
      await user.save();
    }
    const JWT_TOKEN = createToken(user._id);
    res.cookie("google_jwt", JWT_TOKEN);
    res.status(200).send({ message: "user logged in" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
