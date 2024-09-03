const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/REST-2');
        
        // Get a reference to the collection without a schema
        const collection = mongoose.connection.db.collection('exchanges');
        
        // Fetch all documents from the collection
        const exchanges = await collection.find({}).toArray();
        
        // Send the documents as a JSON response
        res.json(exchanges);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching exchanges:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

