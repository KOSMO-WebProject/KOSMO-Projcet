const db = require("../database/db");

const getNoticesList = (req, res) => {
  const q =
    "SELECT n.notice_id, n.title , u.user_name, n.content , n.create_at FROM notices n inner join users u on n.userid = u.user_id ";
  db.query(q, (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};



const getNoticesById = (req, res) => {
    const postId = req.params.id;  // 요청받은 URL 파라미터에서 게시글 ID 추출
    const q = "SELECT n.*, u.user_name FROM notices n INNER JOIN users u ON n.userid = u.user_id WHERE n.notice_id = ?";
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

const postNoticeById = async(req,res) => {
  const { title,content, userid } = req.body
  const create_at = new Date().toISOString()
  const q = "INSERT INTO notices(title, content, create_at, user_id ) VALUES ( ? ? ? ? )"
  db.query(q,[title, content, create_at, userid],(error, results)=>{
    if(error){
      console.error(error)
      return res.status(500).json({ message: "글 등록에 실패하였습니다." });
    }
    else if (results){
      res.status(200).json("게시글이 등록되었습니다.")
    }
  })


}




module.exports = {
  getNoticesList,
  getNoticesById,
  postNoticeById,

}
