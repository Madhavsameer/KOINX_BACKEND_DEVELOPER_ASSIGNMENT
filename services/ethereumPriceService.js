const axios = require("axios");
const EthereumPrice = require("../models/ethereumPrice.js");

const fetchAndStoreEthereumPrice = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    );
    const price = response.data.ethereum.inr;

    const newPrice = new EthereumPrice({ price });
    await newPrice.save();

    console.log(`Ethereum price (${price} INR) stored at ${new Date()}`);
  } catch (error) {
    console.error("Error fetching Ethereum price:", error);
  }
};

exports.getLatestEthereumPrice = async () => {
  return await EthereumPrice.findOne().sort({ timestamp: -1 });
};

exports.startEthereumPriceFetcher = () => {
  fetchAndStoreEthereumPrice();
  setInterval(fetchAndStoreEthereumPrice, 10* 60 * 1000);
};
