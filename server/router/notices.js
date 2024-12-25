const express = require('express');
const router = express.Router();
const noticesController = require('../controller/notices')


//     기본적으로 /notice 가 생략됨.
router.get('/', noticesController.getNoticesList) //게시글 조회
router.get('/:id', noticesController.getNoticesById) //게시글 상세조회 
router.post('/write',noticesController.postNoticeById)
   // .post('/:id',postsController.postNoticeById) //게시글 등록
   //   .put('/:id',updateNoticeById) //게시글 수정
    //   .delete("/:id",postsController.deleteNoticeById) //게시글 삭제
router.delete("/:id",noticesController.deleteNoticeById) // 게시글 삭제
router.put("/:id",noticesController.updateNoticeById)


module.exports = router;