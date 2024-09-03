const {fetchTransactions, storeTransactions} = require('../services/transactionService.js');
const Transaction = require('../models/transaction.js');

exports.getTransactions = async (req, res) => {
    try{
        const { address } = req.params;

        let storedTransactions = await Transaction.findOne({ address});

        if(storedTransactions){
            return res.json(storedTransactions.transactions);
        }

        const transactions = await fetchTransactions(address);
        await storeTransactions(address, transactions);

        res.json(transactions);
    }
    catch(e){
        console.error(e);
        res.status(500).json({
            error: 'Error while fetching the transactions',
            message: e.message
        });
    }
};

