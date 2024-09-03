const CryptoJS = require('crypto-js');
require('dotenv').config();

// Generate a random API key
const apiKey = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
console.log('Generated API Key:', apiKey);

// Hashing function
function hash(text) {
  return CryptoJS.SHA256(text).toString();
}

// Hash the API key
const hashedApiKey = hash(apiKey);
console.log('Hashed API Key:', hashedApiKey);
