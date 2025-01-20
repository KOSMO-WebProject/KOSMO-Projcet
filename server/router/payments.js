const express = require('express');
const router = express.Router();
const paymentsController = require('../controller/payments');



//payments
router.post("/confirm",paymentsController.paymentWidget);

module.exports = router;