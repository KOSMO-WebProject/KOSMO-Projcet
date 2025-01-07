const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

router.post("/register", authController.register);
router.post("/login", authController.login); //클라이언트가 /auth/login으로 post 요청을 보내면
router.post("/logout", authController.logout);
router.get("/accesstoken", authController.accessToken);

router.get("/kakao/login", authController.kakaoLogin);
router.get("/kakao/callback", authController.kakaoCallback);
router.post("/kakao/logout", authController.kakaoLogout);
router.get("/naver/login", authController.naverLogin);
router.post("/naver/callback", authController.naverCallback);

router.post("/weather", authController.getWeather);

module.exports = router;
