const db = require("../database/db");


/* ========================[[ 커뮤니티 글 - CRUD ]]===================================== */

//커뮤니티 조회 & 검색 & 내가 쓴글 // table-community
const getCommunityList = async (req, res) => {
  let sql = "SELECT * FROM community";
  //조건검색: 하나의 keyword로 제목, 내용 둘다 한번에 스캔
  const { keyword, user_id } = req.query //쿼리파라미터 추출
  console.log(keyword);
  console.log(user_id);
  let params = []
  if(keyword){ //검색 조회
    sql += " WHERE c_title like ? OR c_content like ?";
    params.push(`%${keyword}%`)
    params.push(`%${keyword}%`)
  }
  else if(user_id){ // 내가 쓴 글 조회
    sql += " WHERE user_id=?";
    params.push(user_id)
  }
  sql += " ORDER BY c_no desc"; 

  try {
      const [rows] = await db.query(sql, params)
      //성공시 응답하기
      res.json(rows) 
  } catch (error) {
      console.log('Database error:', error)
      res.status(500).json({ error: 'Database error occurred' }); // 에러 발생 시 응답
  }//end of try-catch
};//커뮤니티 조회


//커뮤니티 작성
const setCommunity = async (req, res) =>{
  const { c_title, c_content, user_id } = req.body
  let sql = "INSERT INTO community(c_title, c_content, user_id, c_date)"
  sql += " VALUES(?, ?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i'))"
  try {
    //데이터베이스 쿼리 실행하기
    const [result] = await db.query(sql, [ c_title, c_content, user_id ])
    console.log(result); //1:입력성공, 0:입력실패
    //성공시 응답하기
    res.send({success: 1, result: result})
  } catch (error) {
    console.log('Database error:', error)
    return res.status(500).send({message: '글쓰기 처리 중 오류가 발생하였습니다.'})
  }//end of try-catch
}//end of 커뮤니티 글작성



//커뮤니티 상세보기     ------사용자 컬럼명 --->>> 유저 테이블에서 가져와야 함ㅇㅇㅇㅇ
const getCommunity = async (req, res) => {
  const c_no = req.params.c_no  //:n_no는 URL파라미터이기에 params로 해야함
  let sql = "SELECT c_no, c_title, c_content, user_id, c_date, c_hit FROM community"
  sql += " WHERE c_no=?"
  try {
    const [rows] = await db.query(sql, [c_no])
    if(rows.length === 0) {
      return res.status(404).send({message: '해당 글을 찾을 수 없습니다.'}) 
    }//end of if - 후처리
    //성공시 응답하기
    res.json(rows) 
  } catch (error) {
    console.log('Database error:', error)
    return res.status(500).send({message: '글 상세보기 중 오류가 발생하였습니다.'})
  }//end of try-catch
}; //커뮤니티 상세보기



//커뮤니티 글 수정 - [내글이라는 것 확인후 수정 허용] 단계는 프론트에서 실행
const upd_Community = async (req, res) =>{
  const { c_no } = req.params
  const { c_title, c_content } = req.body
  if(!c_title || !c_content){
    console.error("Missing fields : ", req.body);
    return res.status(400).send("요청한 데이터가 틀렸을 때.")
  }
  let sql = "UPDATE community SET c_title=?, c_content=?, c_date=DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i')"
  sql += " WHERE c_no=?"
  try {
    //데이터베이스 쿼리 실행하기
    const [result] = await db.query(sql, [ c_title, c_content, c_no ])
    console.log(result); //1:입력성공, 0:입력실패
    //성공시 응답하기
    res.status(200).json({success: 1, result: result})
  } catch (error) {
    console.log('Database error:', error)
    return res.status(500).json({message: '글수정 처리 중 오류가 발생하였습니다.'})
  }//end of try-catch
}//end of 커뮤니티 내글 수정


//커뮤니티 내 글 삭제

/* ========================[[ 커뮤니티 글 - CRUD 끝 ]]===================================== */

/* ========================[[ 커뮤니티 댓글 & 대댓글 - CRUD 시작 ]]===================================== */


//댓글&대댓글 조회 -셀프조인으로
//프론트에서 커뮤니티글 조회시 같이 조회
const getCom_reply = async (req, res) => {
  const { c_no } = req.params;
  //댓글번호, 내용, 아이디, 날짜 & 대댓글 번호 내용, 아이디, 날짜 조회 - AS 별칭 사용
  let sql = "SELECT r.cr_no AS cr_no, r.cr_msg AS cr_msg, r.user_id AS cr_user_id, r.cr_date AS cr_date,"
  sql += " rr.rr_no AS rr_no, rr.rr_msg AS rr_msg, rr.user_id AS rr_user_id, rr.rr_date AS rr_date "
  //댓글과 대댓글을 cr_no(댓글번호)로 연결
  sql += " FROM com_reply r "
  sql += " LEFT JOIN com_re_reply rr ON r.cr_no = rr.cr_no "   
  //해당 커뮤니티 글번호
  sql += " WHERE r.c_no =? " 
  //댓글 대댓글 순서대로 정렬
  sql += " ORDER BY r.cr_no, rr.rr_no"

  try {
    const [comments] = await db.query(sql, [c_no]);
    res.send(comments);
  } catch (error) {
    console.log('Database error:', error);
    return res.status(500).send({ message: '댓글 목록 불러오기 오류가 발생했습니다.' });
  }
};

/* -----------------------댓글 CUD 시작 --------------------- */

//댓글 작성    ------사용자 컬럼명 --->>> 유저 테이블에서 가져와야 함ㅇㅇㅇㅇ
const setCom_reply = async (req, res) =>{
  const { c_no } = req.params
  const { cr_msg, user_id } = req.body
  let sql = "INSERT INTO com_reply(cr_msg, user_id, c_no, cr_date)"
  sql += " VALUES(?, ?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i'))"
  try {
    //데이터베이스 쿼리 실행하기
    const [result] = await db.query(sql, [ cr_msg, user_id, c_no ])
    console.log(result); //1:입력성공, 0:입력실패
    //성공시 응답하기
    res.send({success: 1, result: result})
  } catch (error) {
    console.log('Database error:', error)
    return res.status(500).send({message: '댓글 처리 중 오류가 발생하였습니다.'})
  }//end of try-catch
}//end of 댓글 작성

//댓글 수정 
//댓글 삭제 

/* -----------------------댓글 CUD 끝 --------------------- */
/* -----------------------대댓글 CUD 시작 --------------------- */

//대댓글 작성     ------사용자 컬럼명 --->>> 유저 테이블에서 가져와야 함ㅇㅇㅇㅇ
const setCom_re_reply = async (req, res) =>{
  const { c_no, cr_no } = req.params
  const { rr_msg, user_id } = req.body
  let sql = "INSERT INTO com_re_reply(rr_msg, user_id, cr_no, c_no, rr_date)"
  sql += " VALUES(?, ?, ?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i'))"
  try {
    //데이터베이스 쿼리 실행하기
    const [result] = await db.query(sql, [ rr_msg, user_id, cr_no, c_no ])
    console.log(result); //1:입력성공, 0:입력실패
    //성공시 응답하기
    res.send({success: 1, result: result})
  } catch (error) {
    console.log('Database error:', error)
    return res.status(500).send({message: '대댓글 처리 중 오류가 발생하였습니다.'})
  }//end of try-catch
}//end of 댓글 작성

//대댓글 수정
//대댓글 삭제

/* -----------------------대댓글 CUD 끝 --------------------- */
/* ========================[[ 커뮤니티 댓글 & 대댓글 - CRUD 끝 ]]===================================== */



module.exports = {
    getCommunityList,
    getCommunity,
    setCommunity,
    upd_Community,
    getCom_reply,
    setCom_reply,
    setCom_re_reply,
};
  