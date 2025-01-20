// React와 필요한 모듈 import
import React, { useState, useEffect } from "react";
import CommentInput from "./CommentInput"; // 댓글 입력 컴포넌트 import
import CommentList from "./CommentList"; // 댓글 목록 컴포넌트 import
import axios from "axios"; // HTTP 요청을 위한 axios import
import "./styles/Comment.css"; // 스타일 파일 import

// Comment 컴포넌트 정의
const Comment = ({ userNo, noticeNo }) => {
  const [comments, setComments] = useState([]); // 댓글 데이터를 관리하는 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 메시지 관리

  // 컴포넌트가 처음 렌더링될 때와 noticeNo가 변경될 때 실행
  useEffect(() => {
    fetchComments(); // 댓글 데이터 가져오기 함수 호출
  }, [noticeNo]);

  // 요청 처리 헬퍼 함수
  const handleRequest = async (requestFn) => {
    setIsLoading(true); // 로딩 상태 활성화
    setError(null); // 기존 에러 초기화
    try {
      await requestFn(); // 전달받은 요청 함수 실행
    } catch (err) {
      setError("등록된 댓글이 없습니다."); // 에러 메시지 설정
      console.error("Request failed:", err); // 에러 로그 출력
    } finally {
      setIsLoading(false); // 로딩 상태 비활성화
    }
  };

  // 댓글 데이터를 서버에서 가져오는 함수
  const fetchComments = async () => {
    await handleRequest(async () => {
      const response = await axios.get(`/comments/${noticeNo}`); // 서버로부터 댓글 데이터 가져오기
      setComments(response.data); // 가져온 댓글 데이터를 상태에 저장
    });
  };

  // 대댓글 추가 함수
  const addReply = async (parentNo, content) => {
    if (!content.trim()) { // 대댓글 내용이 비어있는 경우
      setError("대댓글 내용을 입력해주세요."); // 에러 메시지 설정
      return;
    }
    await handleRequest(async () => {
      await axios.post("/comments/reply", {
        parent_no: parentNo, // 부모 댓글 번호
        notice_no: noticeNo, // 공지 번호
        content: content.trim(), // 대댓글 내용
        user_no: userNo, // 사용자 번호
      });
      fetchComments(); // 대댓글 추가 후 댓글 목록 새로고침
    });
  };

  // 컴포넌트 렌더링
  return (
    <div className="comment-container"> {/* 댓글 전체 컨테이너 */}
      {error && <p className="error-message">{error}</p>} {/* 에러 메시지 표시 */}
      <CommentInput
        userNo={userNo} // 사용자 번호 전달
        noticeNo={noticeNo} // 공지 번호 전달
        fetchComments={fetchComments} // 댓글 목록 갱신 함수 전달
      />
      <CommentList
        comments={comments} // 댓글 데이터 전달
        addReply={addReply} // 대댓글 추가 함수 전달
      />
      {isLoading && <p className="loading-message">처리 중...</p>} {/* 로딩 메시지 표시 */}
    </div>
  );
};

// Comment 컴포넌트를 외부에서 사용할 수 있도록 export
export default Comment;
