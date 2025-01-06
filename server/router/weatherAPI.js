const express = require("express");
const router = express.Router();
const weatherController = require("../controller/weatherAPI");

// /weatherAPI
router.get("/", weatherController.getWeather); // 도시 이름 기반 날씨 조회

module.exports = router;
