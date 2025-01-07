const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

//auth
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/accesstoken", authController.accessToken);
router.get("/kakao/login", authController.kakaoLogin);
router.get("/kakao/callback", authController.kakaoCallback);


router.get("/naver/login", authController.naverLogin);
router.post("/naver/callback", authController.naverCallback);

module.exports = router;
