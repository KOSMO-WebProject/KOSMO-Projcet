const express = require('express');
const router = express.Router();
const noticesController = require('../controller/notices');
const { authenticateUser } = require('../middleware/authenticate');

// 기본적으로 /notice가 생략됨. e.g., http://localhost:5000/notice
router.get('/', noticesController.getNoticesList); // 게시글 조회
router.get('/:id', noticesController.getNoticesById); // 게시글 상세조회
router.post('/write', noticesController.postNoticeById); // 게시글 등록
router.delete('/:id', noticesController.deleteNoticeById); // 게시글 삭제
router.put('/:id', noticesController.updateNoticeById); // 게시글 수정

// 공지사항 읽음 처리 (인증 필요)
router.post('/read', authenticateUser, noticesController.markNoticeAsRead);

module.exports = router;
