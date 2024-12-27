const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const productsRouter = require('./products');
const authRouter = require("./auth")
const noticesRouter = require("./notices")
const commentsRouter = require("./comments")


//index.js (중앙 라우터 모듈)
// 라우터 등록: usersRouter와 productsRouter를 각각 /users, /products 경로에 연결합니다. 
// 이렇게 함으로써 server.js에서는 단일 라인으로 모든 라우팅을 관리할 수 있게 됩니다. 




router.use('/auth', authRouter); //인증
router.use('/users', usersRouter); //유저정보들 (관리자 추가 예정)
router.use('/products', productsRouter); // 상품
router.use('/notices', noticesRouter); //공지사항
router.use('/comments', commentsRouter); //댓글


module.exports = router;


