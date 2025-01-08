const db = require("../database/db");
const { getCurrentFormattedDate } = require("../utils/currentyear");

const getNoticesList = async(req, res) => {
  const q =
    "SELECT n.notice_no, n.title , u.nick_name, n.content , n.create_at FROM notice n LEFT OUTER JOIN user u on n.userno = u.user_no order by n.notice_no desc";

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
  const q = "SELECT n.*, u.nick_name FROM notice n INNER JOIN user u ON n.userno = u.user_no WHERE n.notice_no = ?";
  
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
  const { title, content, user_no } = req.body;
  const create_at = getCurrentFormattedDate("date");
  const q = "INSERT INTO notice(title, content, create_at, userno) VALUES (?, ?, ?, ?)";
  
  try {
    await db.get().execute(q, [title, content, create_at, user_no]);
    return res.status(200).json("게시글이 등록되었습니다.");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "글 등록에 실패하였습니다." });
  }
};

const deleteNoticeById = async (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM notice WHERE notice_no = ?";
  
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
  const q = "UPDATE notice SET content = ?, title = ?, create_at = ? WHERE notice_no = ?";
  
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
