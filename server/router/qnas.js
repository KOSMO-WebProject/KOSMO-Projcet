const express = require('express');
const router = express.Router();
const qnasController = require('../controller/qnas');
const { authenticateUser } = require('../middleware/authenticate');

// 기본적으로 /qna가 생략됨. e.g., http://localhost:5000/qna
router.get('/', qnasController.getQnasList); // 게시글 조회
router.get('/:id', qnasController.getQnasById); // 게시글 상세조회
router.post('/write', qnasController.postQnaById); // 게시글 등록
router.delete('/:id', qnasController.deleteQnaById); // 게시글 삭제
router.put('/:id', qnasController.updateQnaById); // 게시글 수정

// 공지사항 읽음 처리 (인증 필요)
router.post('/read', authenticateUser, qnasController.markQnaAsRead);

module.exports = router;
