const EthereumPrice = require("../models/ethereumPrice.js");

exports.getLatestPrice = async (req, res) => {
  try {
    console.log("Fetching Ethereum price...");
    const latestPrice = await EthereumPrice.findOne().sort({ timestamp: -1 });

    res.json(latestPrice);
    console.log(`Ethereum price (${latestPrice.price} INR) fetched at ${new Date()}`);
  } catch (error) {
    console.error("Error in getLatestPrice:", error);
    res.status(500).json({ 
        error: "An error occurred while fetching the Ethereum price", 
        message: error.message
    });
  }
};
