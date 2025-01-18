const express = require("express");
const router = express.Router();
const ordersController = require("../controller/orders");


router.post("/", ordersController.postOrders);





module.exports = router;