const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      process.env.JWT_SECRET,
      { expiresIn: parseInt(process.env.MAX_AGE) },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = createToken;
