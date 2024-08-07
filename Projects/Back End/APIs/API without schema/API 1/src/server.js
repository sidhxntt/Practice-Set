const express = require('express');
const mongoose = require('mongoose');
const exchanges_routes = require('../routes/exchanges');

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Welcome to Crypto World');
});

app.use('/exchanges', exchanges_routes);

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
