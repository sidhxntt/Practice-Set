const express = require("express");
const router = express.Router();
require('dotenv').config();

router.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.clearCookie('google_jwt');
    res.json({ message: 'Logged out successfully' });
  });
  

module.exports = router;
