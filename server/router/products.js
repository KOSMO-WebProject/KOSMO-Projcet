const express = require('express');
const router = express.Router();
const db = require('../database/db') //데이터베이스 들고오기

// 모든 사용자 정보 조회
router.get('/', (req, res) => {
    res.send("Hello Products")
  });




module.exports = router;