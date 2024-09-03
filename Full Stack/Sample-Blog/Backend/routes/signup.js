const express = require('express');
const router = express.Router();
const User = require('../models/user_schema');

router.get('/', (req,res)=>{
  res.send('Sign-up API')
})

router.post('/', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Checking if the user already exists by either username or email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Creating a new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error); 
  }
});

module.exports = router;
