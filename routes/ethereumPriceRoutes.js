const express = require('express');
const PriceController = require('../controllers/ethereumPriceController.js');

const router = express.Router();

router
    .get('/eth', PriceController.getLatestPrice);

module.exports = router;