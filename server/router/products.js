const express = require('express');
const router = express.Router();
const productController = require('../controller/product')

// 모든 사용자 정보 조회
//products
router.get("/detail/:product_no",productController.productDetail)
router.get("/:category_no",productController.productList)
router.get("/backpack",productController.getBackPackList)
router.get("/backpack/:no",productController.getBackPackDetail)



module.exports = router;