const mongoose = require('mongoose');

const HashStoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('HashStore', HashStoreSchema);
