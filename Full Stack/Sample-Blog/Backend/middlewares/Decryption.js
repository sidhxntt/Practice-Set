const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const decryptJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Getting the token from the header

  if (!token) 
    return res.status(401).send("Token is required"); 

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid Token"); 
    }
    req.user = decoded; 
    next(); 
  });
};

module.exports = decryptJWT;
