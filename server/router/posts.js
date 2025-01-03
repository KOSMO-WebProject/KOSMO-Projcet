/* 
      공지사항 / QnA / 커뮤니티 / 댓글
*/

const express = require('express');
const router = express.Router();
const qn_Ctrlr = require('../controller/qna_notices'); //공지사항 및 Q&A
const coms_Ctrlr = require('../controller/communities'); //커뮤니티

//기본적으로 /posts가 생략됨.

router.get('/', function(req,res,next){
    res.send('respond with a resource');
}); 

//공지사항 - helps_Ctrlr
router.get('/notice', qn_Ctrlr.getNoticesList) //전체조회
      .post('/notice', qn_Ctrlr.setNotice); //공지 작성
router.get('/notice/:n_no', qn_Ctrlr.getNotice); //상세보기

//Q&A - helps_Ctrlr
router.get('/help', qn_Ctrlr.getHelpList) //전체조회 및 조건검색
      .post('/help', qn_Ctrlr.setHelp_Question); //회원 질문 작성
router.get('/help/:h_no', qn_Ctrlr.getHelp) //상세조회 
      .put('/help/:h_no', qn_Ctrlr.setHelp_Answer); //관리자 답변 작성


//커뮤니티 - coms_Ctrlr
router.get('/community', coms_Ctrlr.getCommunityList) //전체조회및조건검색
      .post('/community', coms_Ctrlr.setCommunity); //글 작성
router.get('/community/:c_no', coms_Ctrlr.getCommunity) //상세조회
       .put('/community/:c_no', coms_Ctrlr.upd_Community) //내 글 수정
/*      .delete('/community/:c_no', coms_Ctrlr.del_Community); //내 글 삭제 */
router.get('/community/:c_no/reply', coms_Ctrlr.getCom_reply) //댓글&대댓글 조회
      .post('/community/:c_no/reply', coms_Ctrlr.setCom_reply) //댓글 작성
/*      .put('/community/:c_no/reply', coms_Ctrlr.upd_Com_reply) //댓글 수정
       .delete('/community/:c_no/reply', coms_Ctrlr.del_Com_reply); //댓글 삭제*/
router.post('/community/:c_no/:cr_no/re_reply', coms_Ctrlr.setCom_re_reply) //대댓글 작성
 /*      .put('/community/:c_no/re_reply', coms_Ctrlr.upd_Com_re_reply) //대댓글 수정
      .delete('/community/:c_no/re_reply', coms_Ctrlr.del_Com_re_reply); //대댓글 삭제 */


module.exports = router;