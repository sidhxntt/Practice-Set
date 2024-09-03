const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.MAX_AGE)
  });
};

module.exports = createToken;
