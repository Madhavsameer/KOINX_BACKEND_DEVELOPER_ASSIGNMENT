const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  address: String,
  transactions: Array
});

module.exports = mongoose.model('Transaction', transactionSchema);
