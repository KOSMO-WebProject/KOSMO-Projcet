// controller/comments.js
const db = require("../database/db");
const { getCurrentFormattedDate } = require("../utils/currentyear");

const getCommentByNotice = async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT c.*, u.nick_name 
    FROM comment c 
    LEFT OUTER JOIN user u ON c.user_no = u.user_no
    WHERE notice_no = ?
    ORDER BY parent_no ASC, created_at DESC`;

  try {
    const [results] = await db.get().execute(query, [id]);
    if (results.length === 0)
      return res.status(400).json("조회된 댓글이 없습니다.");
    return res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching comments: " + err);
    return res.status(500).json("Error fetching comments");
  }
};

const postCommentById = async (req, res) => {
  const { notice_no, user_no, content } = req.body;

  if (!user_no || !notice_no || !content) {
    return res.status(400).json("유저 또는 게시판 또는 댓글 내용이 없습니다.");
  }

  try {
    const [userResults] = await db
      .get()
      .execute("SELECT * FROM user WHERE user_no = ?", [user_no]);
    if (userResults.length === 0)
      return res.status(400).json("해당 유저가 존재하지 않습니다.");

    const created_at = getCurrentFormattedDate("datetime");
    const q =
      "INSERT INTO comment(user_no, notice_no, content, created_at) VALUES (?, ?, ?, ?)";
    await db.get().execute(q, [user_no, notice_no, content, created_at]);
    return res.status(200).json("댓글이 입력되었습니다.");
  } catch (err) {
    console.error("Error posting comment: " + err);
    return res.status(500).json(err);
  }
};

const postReplyById = async (req, res) => {
  const { parent_no, notice_no, content, user_no } = req.body;

  if (!parent_no || !user_no || !notice_no || !content) {
    return res.status(400).json("유저 또는 게시판 또는 댓글 내용이 없습니다.");
  }

  try {
    const [userResults] = await db
      .get()
      .execute("SELECT * FROM user WHERE user_no = ?", [user_no]);
    if (userResults.length === 0)
      return res.status(400).json("해당 유저가 존재하지 않습니다.");

    const created_at = getCurrentFormattedDate("datetime");
    const q =
      "INSERT INTO comment(parent_no, user_no, notice_no, content, created_at) VALUES (?, ?, ?, ?, ?)";
    await db
      .get()
      .execute(q, [parent_no, user_no, notice_no, content, created_at]);
    return res.status(200).json("대댓글이 입력되었습니다.");
  } catch (err) {
    console.error("Error posting reply: " + err);
    return res.status(500).json(err);
  }
};

module.exports = {
  postCommentById,
  getCommentByNotice,
  postReplyById,
};
