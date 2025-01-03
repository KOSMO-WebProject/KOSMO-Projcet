const db = require("../database/db");

/*==========================[[ 공지사항 - CRUD / 관리자유저만  ]]====================================*/

//공지사항 전체조회(조건검색 없음), table-notice
const getNoticesList = async (req, res) => {
  let sql = "SELECT n_no, n_title, n_content, n_date, n_hit FROM notice";
  sql += " ORDER BY n_no desc"; 
  try {
    const [rows] = await db.query(sql)
    //성공시 응답하기
    res.json(rows) 
  } catch (error) {
    console.log('Database error:', error)
    res.status(500).json({ error: 'Database error occurred' }); // 에러 발생 시 응답
  }//end of try-catch
};//공지사항 전체조회(조건검색 없음)


//공지사항 상세보기
const getNotice = async (req, res) => {
  const n_no = req.params.n_no  //:n_no는 URL파라미터이기에 params로 해야함
  let sql = "SELECT n_no, n_title, n_content, n_date, n_hit FROM notice"
  sql += " WHERE n_no=?"
  try {
    const [rows] = await db.query(sql, [n_no])
    if(rows.length === 0) {
      return res.status(404).send({message: '해당 글을 찾을 수 없습니다.'}) 
    }//end of if - 후처리
    //성공시 응답하기
    res.json(rows) 
  } catch (error) {
    console.log('Database error:', error)
    return res.status(500).send({message: '글 상세보기 중 오류가 발생하였습니다.'})
  }//end of try-catch
}; //end of 공지사항 상세보기


//공지사항 작성하기 - 관리자 계정만
const setNotice = async (req, res) =>{
  const { n_title, n_content } = req.body
  let sql = "INSERT INTO notice(n_title, n_content, n_date)"
  sql += " VALUES(?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i'))"
  try {
    //데이터베이스 쿼리 실행하기
    const [result] = await db.query(sql, [ n_title, n_content ])
    console.log(result); //1:입력성공, 0:입력실패
    //성공시 응답하기
    res.send({success: 1, result: result})
  } catch (error) {
    console.log('Database error:', error)
    return res.status(500).send({message: '글 쓰기 처리 중 오류가 발생하였습니다.'})
  }//end of try-catch
}//end of 공지사항 작성하기


//공지사항 수정하기

//공지사항 삭제하기



/*==========================[[ QnA - CRUD ]]====================================*/

//Q&A 전체조회 및 검색(조건 조회), table-help         //답변완료된 것만 조회 -> h_answer !== null 로 검색 at 프론트
const getQnAList = async (req, res) => {
  let sql = "SELECT h_no, h_title, h_content, user_id, h_answer, h_q_date, h_a_date, h_hit FROM help";
  //조건검색: 하나의 keyword로 제목, 내용 둘다 한번에 스캔
  const { keyword, user_id } = req.query //쿼리파라미터 추출
  let params = []
  if(keyword){
    sql += " WHERE h_title like ? OR h_content like ?";
    params.push(`%${keyword}%`)
    params.push(`%${keyword}%`)
  }
  else if(user_id){//내 문의 조회
    sql += " WHERE user_id=?";
    params.push(user_id)
  }
  sql += " ORDER BY h_no desc"; 
  try {
      const [rows] = await db.query(sql, params)
      //성공시 응답하기
      res.json(rows) 
  } catch (error) {
      console.log('Database error:', error)
      res.status(500).json({ error: 'Database error occurred' }); // 에러 발생 시 응답
  }//end of try-catch
};



//Q&A 작성
//질문 작성 - 회원 
const setQnA_Question = async (req, res) =>{
  const { h_title, h_content, user_id } = req.body
  let sql = "INSERT INTO help(h_title, h_content, user_id, h_q_date)"
  sql += " VALUES(?, ?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i'))"
  try {
    //데이터베이스 쿼리 실행하기
    const [result] = await db.query(sql, [ h_title, h_content, user_id ])
    console.log(result); //1:입력성공, 0:입력실패
    //성공시 응답하기
    res.send({success: 1, result: result})
  } catch (error) {
    console.log('Database error:', error)
    return res.status(500).send({message: '글 쓰기 처리 중 오류가 발생하였습니다.'})
  }//end of try-catch
}//end of 질문 작성

//답변 작성 - 관리자
const setQnA_Answer = async (req, res) =>{
  const h_no = req.params.h_no
  const { h_answer } = req.body
  if(!h_answer){
    console.error("Missing fields : ", req.body);
    return res.status(400).send("요청한 데이터가 틀렸을 때.")
  }
  let sql = "UPDATE help SET h_answer=?, h_a_date=DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i')"
  sql += " WHERE h_no=?"
  try {
    //데이터베이스 쿼리 실행하기
    const [result] = await db.query(sql, [ h_answer, h_no ])
    console.log(result); //1:입력성공, 0:입력실패
    //성공시 응답하기
    res.send({success: 1, result: result})
  } catch (error) {
    console.log('Database error:', error)
    return res.status(500).send({message: '글수정 처리 중 오류가 발생하였습니다.'})
  }//end of try-catch
}//end of 답변 작성



//Q&A 상세보기 - 질문 및 답변
const getQnA = async (req, res) => {
  const h_no = req.params.h_no  //:n_no는 URL파라미터이기에 params로 해야함
  let sql = "SELECT h_no, h_title, h_content, user_id, h_answer, h_q_date, h_a_date, h_hit FROM help"
  sql += " WHERE h_no=?"
  try {
    const [rows] = await db.query(sql, [h_no])
    if(rows.length === 0) {
      return res.status(404).send({message: '해당 글을 찾을 수 없습니다.'}) 
    }//end of if - 후처리
    //성공시 응답하기
    res.json(rows) 
  } catch (error) {
    console.log('Database error:', error)
    return res.status(500).send({message: '글 상세보기 중 오류가 발생하였습니다.'})
  }//end of try-catch
}; //Q&A 상세보기


//Q&A 내 문의 수정


//Q&A 내 문의 삭제



module.exports = {
  getNoticesList,
  getNotice,
  setNotice,
  getQnAList,
  getQnA,
  setQnA_Question,
  setQnA_Answer,
};
