

const express = require('express');
const router = express.Router();
const commentsController = require('../controller/comments');


//comments
router.post("/write",commentsController.postCommentById)
router.post("/reply",commentsController.postReplyById)
router.get("/:id",commentsController.getCommentByNotice)




module.exports = router;