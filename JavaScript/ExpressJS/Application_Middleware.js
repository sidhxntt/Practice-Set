const express = require('express');
const moment = require('moment');
const app = express();
const port = 3000;

// Middleware function for logging
app.use((req, res, next) => {
    console.log('LOGGED:', req.url);
    next();
});

// Route handler to handle the request
app.get('/', (req, res, next) => {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    req.timestamp = timestamp;
    console.log(timestamp);
    next();
},(req, res) => {
    // Access timestamp from request object
    const timestamp = req.timestamp;
    res.send(`Hello World! The time is ${timestamp}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
