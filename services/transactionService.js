const axios = require("axios");
const Transaction = require("../models/transaction.js");

exports.fetchTransactions = async (address) => {
  const storedTransactions = await Transaction.findOne({ address });
  if (storedTransactions) {
    return storedTransactions.transactions;
  }

  // If not in database, fetch from Etherscan API
  const response = await axios.get(`https://api.etherscan.io/api`, {
    params: {
      module: "account",
      action: "txlist",
      address: address,
      startblock: 0,
      endblock: 99999999,
      sort: "asc",
      apikey: process.env.ETHERSCAN_API_KEY,
    },
  });

  // Store in database
  const newTransaction = new Transaction({
    address,
    transactions: response.data.result,
  });
  await newTransaction.save();

  return response.data.result;
};

exports.calculateTotalExpenses = (transactions) => {
//   console.log(transactions);
  const expenses = transactions.map((tx) => {
    const gasUsed = BigInt(tx.gasUsed);
    const gasPrice = BigInt(tx.gasPrice);
    return Number(gasUsed * gasPrice) / 1e18;
  });

  return expenses.reduce((total, expense) => total + expense, 0);
};

exports.storeTransactions = async (address, transactions) => {
  const newTransaction = new Transaction({ address, transactions });
  await newTransaction.save();
};
