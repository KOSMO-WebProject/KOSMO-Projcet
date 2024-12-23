const express = require('express');
const router = express.Router();
const noticesController = require('../controller/notices')


//     기본적으로 /posts가 생략됨.
router.get('/:id', noticesController.getNoticesById) //게시글 상세조회 
router.get('/', noticesController.getNoticesList) //게시글 조회
      .post('/',noticesController.postNoticeById);
   // .post('/:id',postsController.postNoticeById) //게시글 등록
   //   .put('/:id',updateNoticeById) //게시글 수정
    //   .delete("/:id",postsController.deleteNoticeById) //게시글 삭제


module.exports = router;