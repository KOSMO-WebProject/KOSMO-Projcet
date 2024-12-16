const db = require("../database/db");

const getPostsList = (req, res) => {
  const q =
    "SELECT p.id, p.title , u.nickid, p.content , p.createdAt FROM posts p inner join users u on p.userid = u.id ";
  db.query(q, (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

const getPostsById = (req, res) => {
    const postId = req.params.id;  // URL 파라미터에서 게시글 ID 추출
    const q = "SELECT p.*, u.nickid FROM posts p INNER JOIN users u ON p.userid = u.id WHERE p.id = ?";
    
    db.query(q, [postId], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving the post' });
      }
  
      if (results.length > 0) {
        res.status(200).json(results[0]); // 상세 조회 결과는 하나의 게시글만 반환
      } else {
        res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
      }
    });
  };


module.exports = {
  getPostsList,
  getPostsById,
};
