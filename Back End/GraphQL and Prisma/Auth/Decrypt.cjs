const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;
const { GraphQLError } = require("graphql");

const decryptJWT = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(
          new GraphQLError("Invalid token", {
            extensions: {
              code: "INVALID_TOKEN",
              http: { status: 401 },
            },
          })
        );
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = decryptJWT;
