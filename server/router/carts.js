const express = require('express')
const router = express.Router();
const cartsController = require('../controller/carts');


//carts
router.get("/item/:user_no",cartsController.cartList)
      .post("/item",cartsController.cartInsert)
      // .put("/item/:cart_item_no",cartsController.cartUpdate)
      .delete("/item/:cart_item_no",cartsController.cartOneDelete)
      .delete("/:cart_no",cartsController.cartAllDelete)












module.exports = router;