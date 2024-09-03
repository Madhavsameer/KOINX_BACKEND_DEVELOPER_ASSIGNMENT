const express = require('express');
const { getUserExpensesAndEtherPrice } = require('../controllers/userController.js');

const router = express.Router();

router.get('/:address', getUserExpensesAndEtherPrice);

module.exports = router;