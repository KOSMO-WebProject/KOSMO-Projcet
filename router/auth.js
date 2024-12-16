const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

router.post('/register', authController.register)
      .post("/login",authController.login); //클라이언트가 /auth/login으로 post 요청을 보내면



module.exports = router;