const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const productsRouter = require('./products');
const authRouter = require("./auth")
const postsRouter = require("./posts")

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/auth', authRouter);
router.use('/posts', postsRouter);


module.exports = router;





//index.js (중앙 라우터 모듈)
// 라우터 등록: usersRouter와 productsRouter를 각각 /users, /products 경로에 연결합니다. 
// 이렇게 함으로써 server.js에서는 단일 라인으로 모든 라우팅을 관리할 수 있게 됩니다. 
