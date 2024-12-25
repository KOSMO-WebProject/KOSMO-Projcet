

const express = require('express');
const router = express.Router();
const commentsController = require('../controller/comments');



router.post("/write",commentsController.postCommentById)
router.post("/replay",commentsController.postReplyById)
router.get("/:id",commentsController.getCommentByNotice)




module.exports = router;