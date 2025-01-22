const express = require('express');
const router = express.Router();
const usersController = require('../controller/users');

// /users
router.get('/', usersController.getAllUsers); // 회원 정보 전체 조회
<<<<<<< HEAD
router.get('/:id', usersController.getUserById) // 회원 정보 조회 (1건)
=======
router.get('/:id', usersController.getUserById); // 회원 정보 조회 (1건)

// 회원정보 수정
router.put('/:id/', usersController.updateUserInfo); // 회원정보 수정 (이름, 연락처 등)

// 비밀번호 관련
router.put('/:id/password', usersController.updatePassword); // 비밀번호 변경
router.post('/:id/find-password', usersController.resetPassword); // 비밀번호 찾기

// 아이디 및 이메일 찾기
router.post('/findByID',usersController.findByID);

// 회원 탈퇴
router.delete('/:id/', usersController.deleteUser);

>>>>>>> songbeom
//       .post('/:id')
router.post("/findByID",usersController.findByID);

module.exports = router;