const db = require("../database/db");
const { getCurrentFormattedDate } = require("../utils/currentyear");

const getCommentByNotice = async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT c.*, u.nickname FROM comments c LEFT OUTER JOIN users u on c.user_id = u.user_id
    WHERE notice_id = ?
    ORDER BY created_at DESC`;
  
  try {
    const [results] = await db.get().execute(query, [id]);
    if (results.length === 0) return res.status(400).json("조회된 댓글이 없습니다.");
    return res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching comments: ' + err);
    return res.status(500).json('Error fetching comments');
  }
};

const postCommentById = async (req, res) => {
  const { notice_id, user_id, content } = req.body;

  if (!user_id || !notice_id || !content) {
    return res.status(400).json("유저 또는 게시판 또는 댓글 내용이 없습니다.");
  }

  try {
    const [userResults] = await db.get().execute("SELECT * FROM users WHERE user_id = ?", [user_id]);
    if (userResults.length === 0) return res.status(400).json("해당 유저가 존재하지 않습니다.");

    const created_at = getCurrentFormattedDate("datetime");
    const q = "INSERT INTO comments(user_id, notice_id, content, created_at) VALUES (?, ?, ?, ?)";
    await db.get().execute(q, [user_id, notice_id, content, created_at]);
    return res.status(200).json("댓글이 입력되었습니다.");
  } catch (err) {
    console.error('Error posting comment: ' + err);
    return res.status(500).json(err);
  }
};

const postReplyById = async (req, res) => {
  const { parent_id, notice_id, content, user_id } = req.body;

  if (!parent_id || !user_id || !notice_id || !content) {
    return res.status(400).json("유저 또는 게시판 또는 댓글 내용이 없습니다.");
  }

  try {
    const [userResults] = await db.get().execute("SELECT * FROM users WHERE user_id = ?", [user_id]);
    if (userResults.length === 0) return res.status(400).json("해당 유저가 존재하지 않습니다.");

    const created_at = getCurrentFormattedDate("datetime");
    const q = "INSERT INTO comments(parent_id, user_id, notice_id, content, created_at) VALUES (?, ?, ?, ?, ?)";
    await db.get().execute(q, [parent_id, user_id, notice_id, content, created_at]);
    return res.status(200).json("댓글이 입력되었습니다.");
  } catch (err) {
    console.error('Error posting reply: ' + err);
    return res.status(500).json(err);
  }
};

module.exports = {
  postCommentById,
  getCommentByNotice,
  postReplyById,
};
