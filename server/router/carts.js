const express = require('express')
const router = express.Router();
const cartsController = require('../controller/carts');


//carts
router.get("/item/:user_no",cartsController.cartList)
      .post("/item",cartsController.cartInsert)
      .delete("/item/:cart_item_no",cartsController.cartDelete)













module.exports = router;