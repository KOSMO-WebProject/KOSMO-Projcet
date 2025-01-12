const express = require('express');
const router = express.Router();
const paymentsController = require('../controller/payments');



//api
router.post("/confirm/widget",paymentsController.paymentWidget);

module.exports = router;