const express = require('express');
const router = express.Router();
const qnasController = require('../controller/qnas');
const { authenticateUser } = require('../middleware/authenticate');

// 기본적으로 /qnas 생략됨. e.g., http://localhost:5000/notice
router.get('/', qnasController.getQnasList); // 문의 조회
router.get('/:id', qnasController.getQnasById); // 문의 상세조회
router.post('/write', qnasController.postQnaById); // 문의 등록
router.delete('/:id', qnasController.deleteQnaById); // 문의 삭제
router.put('/:id', qnasController.updateQnaById); // 문의 수정

// 공지사항 읽음 처리 (인증 필요)
router.post('/read', authenticateUser, qnasController.markNoticeAsRead);

module.exports = router;
