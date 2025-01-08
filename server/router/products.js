const express = require('express');
const router = express.Router();
const productController = require('../controller/product')

// 모든 사용자 정보 조회
router.get("/",productController.productList)
router.get("/backpack",productController.productBackpack)



module.exports = router;