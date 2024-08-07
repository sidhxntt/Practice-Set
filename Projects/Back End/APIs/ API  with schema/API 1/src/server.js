const express = require('express');
const mongoose = require('mongoose');
const exchange_route = require('../routes/exchanges')
const data= require('../models/data')

const app = express();
const port = 3000;

async function connect_to_database() {
    try {
        await mongoose.connect('mongodb://localhost:27017/REST-2');
        console.log("Connected to database");
    } catch (error) {
        console.error("Failed to connect to database:", error);
    }
}
connect_to_database(); 
data();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/exchanges',exchange_route)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
