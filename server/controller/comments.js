const db = require("../database/db");
const { getCurrentFormattedDate } = require("../utils/currentyear");



const getCommentByNotice = (req, res) => {
    const { id } = req.params; 
    const query = `
        SELECT c.*, u.nickname FROM comments c LEFT OUTER JOIN users u on c.user_id = u.user_id
        WHERE notice_id = ?
        ORDER BY created_at DESC `; 
    db.get().execute(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching comments: ' + err);
            return res.status(500).json('Error fetching comments');

        }
        if(!results) return res.status(400).json("조회된 댓글이 없습니다.")
        return res.status(200).json(results);
    });
};



const postCommentById = (req,res) =>{
    const {notice_id, user_id , content} = req.body

    if (!user_id || !notice_id || !content) {
        return res.status(400).json("유저 또는 게시판 또는 댓글 내용이 없습니다.");
    }
    const q = "SELECT * FROM users WHERE user_id = ?" //1건만 출력 notice_id에 맞는
    db.get().execute(q,[user_id], (err,results) =>{
        if(err) res.status(500).json(err)
        if(!results[0]) res.status(400).json("해당 유저가 존재하지 않습니다.")
        const created_at = getCurrentFormattedDate("datetime")    
        const q = "INSERT INTO comments(user_id, notice_id, content, created_at ) VALUES (?, ?, ?, ? )"
        db.get().execute(q,[user_id,notice_id,content,created_at],(err,results)=>{
            if(err) return res.status(500).json(err)
            return res.status(200).json("댓글이 입력되었습니다.")
        })
        
    })
}


const postReplyById = (req,res) =>{
    console.log(req.body);
    const {parent_id ,notice_id, content , user_id} = req.body
    console.log(parent_id,notice_id,content,user_id);

    if (!parent_id || !user_id || !notice_id || !content) {
        return res.status(400).json("유저 또는 게시판 또는 댓글 내용이 없습니다.");
    }
    const q = "SELECT * FROM users WHERE user_id = ?" //1건만 출력 notice_id에 맞는
    db.get().execute(q,[user_id], (err,results) =>{
        if(err) res.status(500).json(err)
        if(!results[0]) res.status(400).json("해당 유저가 존재하지 않습니다.")
        const created_at = getCurrentFormattedDate("datetime")    
        const q = "INSERT INTO comments(parent_id , user_id, notice_id, content, created_at ) VALUES (?, ?, ?, ?, ? )"
        db.get().execute(q,[parent_id,user_id,notice_id,content,created_at],(err,results)=>{
            if(err) return res.status(500).json(err)
            return res.status(200).json("댓글이 입력되었습니다.")
        })
        
    })
}










module.exports = {
   postCommentById,
   getCommentByNotice,
   postReplyById,
};