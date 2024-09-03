const { fetchTransactions, calculateTotalExpenses } = require('../services/transactionService.js');
const { getLatestEthereumPrice } = require('../services/ethereumPriceService.js');

exports.getUserExpensesAndEtherPrice = async (req, res) => {
  try {
    const { address } = req.params;

    // Fetch transactions
    const transactions = await fetchTransactions(address);

    // Calculate total expenses
    const totalExpenses = calculateTotalExpenses(transactions);
    // console.log(transactions);

    // Get current Ethereum price
    const latestPrice = await getLatestEthereumPrice();

    res.json({
      address,
      totalExpenses,
      currentEtherPrice: latestPrice ? latestPrice.price : null,
      transactionCount: transactions.length,
    });
  } catch (error) {
    console.error('Error in getUserExpensesAndEtherPrice:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};