const fs = require('fs');

const jsonData = fs.readFileSync('./data.js');
const data = JSON.parse(jsonData);
