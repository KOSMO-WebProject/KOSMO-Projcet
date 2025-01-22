const express = require('express');
const router = express.Router();
const productsController = require('../controller/products')

// 모든 사용자 정보 조회
//products
router.get("/detail/:product_no",productsController.productDetail)
router.get("/:category_no",productsController.productList)
router.get("/products/backpack",productsController.getBackPackList)



module.exports = router;