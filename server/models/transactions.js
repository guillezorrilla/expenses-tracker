const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionModel = new Schema({
  name: {
    type: String,
    default: 'Anonymous'
  },
  type: {
    type: String,
    default: 'Investment'
  },
  amount: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Transactions = mongoose.model('transactions', transactionModel);

module.exports = Transactions;
