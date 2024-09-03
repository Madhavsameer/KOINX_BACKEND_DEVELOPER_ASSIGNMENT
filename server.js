const express = require("express");
const connectDB = require("./config/database");
const transactionRoutes = require("./routes/transactionRoutes");
const ethereumPriceRoutes = require("./routes/ethereumPriceRoutes");
const userRoutes = require("./routes/userRoutes");
const {
  startEthereumPriceFetcher,
} = require("./services/ethereumPriceService");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello! Ethereum Expense Tracker is running!",
    version: "1.0.0",
    apiDocs: {
      "/api/transactions/:address": {
        description: "Endpoint for listing all transactions",
        methods: ["GET"],
      },
      "/api/price/eth": {
        description: "Endpoint for Latest Ethereum price ",
        methods: ["GET"],
      },
      "/api/balance/:address": {
        description: "Endpoint for user balance information",
        methods: ["GET"],
      },
    },
  });
});

const setupRoutes = (app) => {
  app.use("/api/transactions", transactionRoutes);
  app.use("/api/price", ethereumPriceRoutes);
  app.use("/api/balance", userRoutes);
};

setTimeout(() => {
    setupRoutes(app);
  }, 1000)

startEthereumPriceFetcher();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
