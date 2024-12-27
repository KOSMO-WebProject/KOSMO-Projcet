const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");

// /users
router.get("/", usersController.getAllUsers); // 회원 정보 전체 조회
router.get("/:id", usersController.getUserById); // 회원 정보 조회 (1건)
//       .post('/:id')

module.exports = router;
