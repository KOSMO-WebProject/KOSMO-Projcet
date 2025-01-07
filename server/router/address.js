const express = require("express");
const router = express.Router();
const addressController = require("../controller/address");

//address 생략됨
router.get("/", addressController.getAllAddresses);
router.post("/", addressController.addAddress);

module.exports = router;