// React와 필요한 모듈 import
import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap"; // Bootstrap 컴포넌트 import
import axios from "axios"; // HTTP 요청을 위한 axios import
import "./styles/CommentInput.css"; // 스타일 파일 import

// CommentInput 컴포넌트 정의
const CommentInput = ({ userNo, noticeNo, fetchComments }) => {
  const [comment, setComment] = useState(""); // 댓글 내용 상태 관리

  // 댓글 입력 변경 핸들러
  const handleCommentChange = (e) => {
    setComment(e.target.value || ""); // 입력된 값으로 상태 업데이트
  };

  // 댓글 등록 버튼 클릭 핸들러
  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // 기본 동작(페이지 새로고침) 방지

    if (!comment.trim()) { // 댓글 내용이 비어있는지 확인
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      // 서버로 댓글 데이터 전송
      await axios.post(`/comments/write`, {
        user_no: userNo, // 사용자 번호
        notice_no: noticeNo, // 공지 번호
        content: comment.trim(), // 댓글 내용
      });

      fetchComments(); // 댓글 목록 새로고침
      setComment(""); // 입력 필드 초기화
    } catch (error) {
      console.error("댓글 등록 실패:", error); // 에러 로그 출력
    }
  };

  // 엔터 키 입력 핸들러
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { // 엔터 키를 감지 (Shift+Enter는 제외)
      e.preventDefault(); // 기본 엔터 동작 방지
      handleCommentSubmit(e); // 댓글 등록 핸들러 호출
    }
  };

  // 컴포넌트 렌더링
  return (
    <Form onSubmit={handleCommentSubmit} className="comment-input-container"> {/* 댓글 입력 폼 */}
      <InputGroup>
        <Form.Control
          type="text" // 입력 필드 타입
          placeholder="댓글을 입력하세요" // 기본 안내 텍스트
          value={comment} // 입력 필드의 값
          onChange={handleCommentChange} // 입력 변경 시 호출되는 핸들러
          onKeyDown={handleKeyPress} // 키 입력 시 호출되는 핸들러
        />
        <Button variant="outline-secondary" type="submit"> {/* 등록 버튼 */}
          등록
        </Button>
      </InputGroup>
    </Form>
  );
};

// CommentInput 컴포넌트를 외부에서 사용할 수 있도록 export
export default CommentInput;
