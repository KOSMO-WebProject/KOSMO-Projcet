const db = require("../database/db");
const { getCurrentFormattedDate } = require("../utils/currentyear");

const getNoticesList = async (req, res) => {
  const q =
    "SELECT n.notice_id, n.title , u.nickname, n.content , n.create_at FROM notices n LEFT OUTER JOIN users u on n.userid = u.user_id order by n.notice_id desc";
  try{
    const [rows] = await db.get().execute(q)
    console.log(rows)
    return res.status(200).json(rows)

  }catch(error){
    return res.status(500).json({ message: "게시글을 조회할 수 없습니다."})
  }
};



const getNoticesById = (req, res) => {
    const postId = req.params.id;  // 요청받은 URL 파라미터에서 게시글 ID 추출
    const q = "SELECT n.*, u.nickname FROM notices n INNER JOIN users u ON n.userid = u.user_id WHERE n.notice_id = ?";
    db.query(q, [postId], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving the post' });
      }
  
      if (results.length > 0) {
        return res.status(200).json(results[0]); // 상세 조회 결과는 하나의 게시글만 반환
      } else {
        return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
      }
    });
  };

const postNoticeById = (req,res) => {
  const { title,content, user_id } = req.body
  const create_at = getCurrentFormattedDate("date")
  const q = "INSERT INTO notices(title, content, create_at, userid ) VALUES ( ?, ?, ?, ? )"
  db.query(q,[title, content, create_at, user_id],(error, results)=>{
    if(error){
      console.error(error)
      return res.status(500).json({ message: "글 등록에 실패하였습니다." });
    }
    else if (results){
      return res.status(200).json("게시글이 등록되었습니다.")
    }
  })
}



const deleteNoticeById = (req,res) => {
  const id  = req.params.id
  const q = "DELETE FROM notices WHERE notice_id = ? "
  db.query(q,[id],(error, results)=>{
    if(error){
      console.error(error)
      return res.status(500).json({ message: "글 삭제에 실패하였습니다." });
    }
    else if (results){
      return res.status(200).json("게시글이 삭제되었습니다.")
    }
  })
}

const updateNoticeById = (req,res) => {
    const id = req.params.id
    const create_at = getCurrentFormattedDate("date")
    const {content, title} = req.body
    const q = "UPDATE notices SET content = ? , title = ? , create_at = ? WHERE notice_id = ?"
    db.query(q,[content,title,create_at,id],(error, results)=>{
      if(error){
        console.error(error)
        return res.status(500).json({ message: "글 수정에 실패하였습니다." });
      }
      else if (results){
        return res.status(200).json("게시글이 수정되었습니다.")
      }
    })
}



module.exports = {
  getNoticesList,
  getNoticesById,
  postNoticeById,
  deleteNoticeById,
  updateNoticeById,

}
