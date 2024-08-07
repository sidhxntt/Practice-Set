const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/REST-1');

// Define a schema
const dataSchema = new mongoose.Schema({
  // Define your schema fields based on your JSON structure
});

// Define a model
const DataModel = mongoose.model('Data', dataSchema);

// Save data to MongoDB
DataModel.create(data)
  .then(() => console.log('Data saved to MongoDB'))
  .catch((error) => console.error('Error saving data to MongoDB:', error));
