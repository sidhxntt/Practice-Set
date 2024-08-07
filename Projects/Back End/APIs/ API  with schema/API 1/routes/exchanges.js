const express = require('express');
const router = express.Router();
const exchanges_2_documents = require('../models/schema');

// Get all exchanges
router.get('/', async (req, res) => {
    try {
        const exchanges = await exchanges_2_documents.find();
        res.json(exchanges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware for fetching one exchange document
async function get_one_exchange_document(req, res, next) {
    try {
        const doc = await exchanges_2_documents.findById(req.params.id);
        if (!doc) {
            return res.status(404).json({ message: "Cannot find exchange document" });
        }
        res.doc = doc;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Get one exchange by ID
router.get("/:id", get_one_exchange_document, async (req, res) => {
    try {
       res.json(res.doc);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
