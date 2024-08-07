require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');

const connect_to_database = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database");
    } catch (error) {
        console.error("Failed to connect to database:", error);
    }
}

module.exports = connect_to_database;
