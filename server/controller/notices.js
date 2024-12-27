const db = require("../database/db");
const { getCurrentFormattedDate } = require("../utils/currentyear");

const getNoticesList = async(req, res) => {
  const q =
    "SELECT n.notice_id, n.title , u.nickname, n.content , n.create_at FROM notices n LEFT OUTER JOIN users u on n.userid = u.user_id order by n.notice_id desc";

  try{
    const [rows] = await db.get().execute(q);
    return res.status(200).json(rows)

  }catch(error){
    console.log(error);
    return res.status(500).json({ message: "게시글을 조회할 수 없습니다."})
  }
};



const getNoticesById = async (req, res) => {
  const postId = req.params.id;
  const q = "SELECT n.*, u.nickname FROM notices n INNER JOIN users u ON n.userid = u.user_id WHERE n.notice_id = ?";
  
  try {
    const [results] = await db.get().execute(q, [postId]);
    if (results.length > 0) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving the post' });
  }
};

const postNoticeById = async (req, res) => {
  const { title, content, user_id } = req.body;
  const create_at = getCurrentFormattedDate("date");
  const q = "INSERT INTO notices(title, content, create_at, userid) VALUES (?, ?, ?, ?)";
  
  try {
    await db.get().execute(q, [title, content, create_at, user_id]);
    return res.status(200).json("게시글이 등록되었습니다.");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "글 등록에 실패하였습니다." });
  }
};

const deleteNoticeById = async (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM notices WHERE notice_id = ?";
  
  try {
    await db.get().execute(q, [id]);
    return res.status(200).json("게시글이 삭제되었습니다.");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "글 삭제에 실패하였습니다." });
  }
};

const updateNoticeById = async (req, res) => {
  const id = req.params.id;
  const create_at = getCurrentFormattedDate("date");
  const { content, title } = req.body;
  const q = "UPDATE notices SET content = ?, title = ?, create_at = ? WHERE notice_id = ?";
  
  try {
    await db.get().execute(q, [content, title, create_at, id]);
    return res.status(200).json("게시글이 수정되었습니다.");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "글 수정에 실패하였습니다." });
  }
}



module.exports = {
  getNoticesList,
  getNoticesById,
  postNoticeById,
  deleteNoticeById,
  updateNoticeById,

}
