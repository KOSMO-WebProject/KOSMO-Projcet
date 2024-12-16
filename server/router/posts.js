const express = require('express');
const router = express.Router();
const postsController = require('../controller/posts');


//     기본적으로 /posts가 생략됨.
router.get('/', postsController.getPostsList); 
router.get('/:id', postsController.getPostsById);

module.exports = router;