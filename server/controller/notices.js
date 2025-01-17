const db = require("../database/db");
const { getCurrentFormattedDate } = require("../utils/currentyear");

// 공지사항 목록 조회 (검색 포함)
const getNoticesList = async (req, res) => {
  const { page = 1, size = 10, gubun, keyword } = req.query;
  const offset = (page - 1) * size;

  let condition = "";
  if (gubun && keyword) {
    const fieldMapping = {
      n_title: "n.title",
      n_writer: "u.nick_name",
      n_content: "n.content",
    };
    const field = fieldMapping[gubun];
    if (field) {
      condition = `WHERE ${field} LIKE ?`;
    }
  }

  const q = `
    SELECT 
      n.notice_no, 
      n.title, 
      u.nick_name, 
      n.content, 
      n.create_at
    FROM notice n
    LEFT OUTER JOIN user u ON n.userno = u.user_no
    ${condition}
    ORDER BY n.notice_no DESC
    LIMIT ${Number(size)} OFFSET ${Number(offset)}
  `;

  try {
    const [rows] = await db.get().execute(q, keyword ? [`%${keyword}%`] : []);

    const countQ = `
      SELECT COUNT(*) as totalCount
      FROM notice n
      LEFT OUTER JOIN user u ON n.userno = u.user_no
      ${condition}
    `;
    const [countRows] = await db
      .get()
      .execute(countQ, keyword ? [`%${keyword}%`] : []);
    const totalCount = countRows[0].totalCount;
    const totalPages = Math.ceil(totalCount / size);

    return res.status(200).json({
      content: rows,
      totalPages,
      currentPage: Number(page),
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching notices:", error);
    return res
      .status(500)
      .json({ message: "게시글을 조회할 수 없습니다.", error: error.message });
  }
};

// 공지사항 읽음 처리
const markNoticeAsRead = async (req, res) => {
  const { noticeNo, userId } = req.body;

  if (!noticeNo || !userId) {
    return res.status(400).json({ message: "필수 파라미터가 누락되었습니다." });
  }

  const query = `
    INSERT INTO user_notices (user_id, notice_no, is_read)
    VALUES (?, ?, TRUE)
    ON DUPLICATE KEY UPDATE is_read = TRUE
  `;
  try {
    await db.get().execute(query, [userId, noticeNo]);
    return res
      .status(200)
      .json({ message: "읽음 상태가 성공적으로 업데이트되었습니다." });
  } catch (error) {
    console.error("읽음 처리 중 오류 발생:", error);
    return res
      .status(500)
      .json({ message: "읽음 상태 업데이트 실패", error: error.message });
  }
};

const getNoticesById = async (req, res) => {
  const postId = req.params.id;
  const q = `
    SELECT 
      n.notice_no, 
      n.title, 
      n.content, 
      n.create_at, 
      u.nick_name, 
      n.userno
    FROM notice n 
    INNER JOIN user u ON n.userno = u.user_no 
    WHERE n.notice_no = ?`;

  try {
    const [results] = await db.get().execute(q, [postId]);
    if (results.length > 0) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving the post" });
  }
};

const postNoticeById = async (req, res) => {
  const { title, content, user_no } = req.body;
  const create_at = getCurrentFormattedDate("date");
  const q =
    "INSERT INTO notice(title, content, create_at, userno) VALUES (?, ?, ?, ?)";

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
  const q =
    "UPDATE notice SET content = ?, title = ?, create_at = ? WHERE notice_no = ?";

  try {
    await db.get().execute(q, [content, title, create_at, id]);
    return res.status(200).json("게시글이 수정되었습니다.");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "글 수정에 실패하였습니다." });
  }
};

module.exports = {
  getNoticesList,
  markNoticeAsRead,
  getNoticesById,
  postNoticeById,
  deleteNoticeById,
  updateNoticeById,
};
