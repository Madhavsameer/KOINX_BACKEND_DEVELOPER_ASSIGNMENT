const mongoose = require('mongoose');

const ethereumPriceSchema = new mongoose.Schema({
  price: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EthereumPrice', ethereumPriceSchema);
