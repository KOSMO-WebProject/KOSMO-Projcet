const express = require("express");
const router = express.Router();
const ordersController = require("../controller/orders");


router.get("/:user_no", ordersController.getOrdersList)
      .post("/", ordersController.postOrders);





module.exports = router;