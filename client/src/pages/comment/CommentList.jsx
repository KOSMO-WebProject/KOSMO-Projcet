// React와 필요한 Bootstrap 컴포넌트를 import
import React, { useState } from "react";
import { Form, InputGroup, ListGroup, ListGroupItem, Button, Spinner } from "react-bootstrap";
import "./styles/CommentList.css"; // 스타일 파일 import

// CommentList 컴포넌트 정의
const CommentList = ({ comments, addReply }) => {
  // 대댓글 상태 관리 (대상 댓글 번호와 내용 저장)
  const [reply, setReply] = useState({
    parent_no: null, // 대댓글의 부모 댓글 번호
    content: "", // 대댓글 내용
  });

  // 댓글 목록의 열림 상태 관리
  const [openReplies, setOpenReplies] = useState({});

  // 대댓글 추가 중 상태 관리 (스피너 표시용)
  const [isReplying, setIsReplying] = useState(false);

  // 날짜 포맷을 지정하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString); // 문자열을 Date 객체로 변환
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  // 대댓글 입력 변경 핸들러
  const handleOnChange = (e, parentNo) => {
    setReply({
      parent_no: parentNo, // 대댓글의 부모 번호 저장
      content: e.target.value || "", // 입력된 값 저장
    });
  };

  // 대댓글 추가 버튼 클릭 핸들러
  const handleOnClick = () => {
    if (!reply.content.trim()) { // 내용이 없으면 경고
      alert("대댓글 내용을 입력해주세요.");
      return;
    }

    setIsReplying(true); // 대댓글 추가 중 상태 활성화
    addReply(reply.parent_no, reply.content.trim()); // 대댓글 추가 함수 호출

    // 입력 필드 초기화
    setReply({ parent_no: null, content: "" });

    // 대댓글 추가 후 상태 해제 및 스크롤 이동
    setTimeout(() => {
      setIsReplying(false);
      document
        .querySelector(`#comment-${reply.parent_no}`) // 대댓글 대상 댓글로 스크롤 이동
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  // 대댓글 열기/닫기 토글 핸들러
  const toggleReplies = (commentNo) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentNo]: !prev[commentNo], // 상태 반전
    }));
  };

  // 대댓글 렌더링 함수
  const renderReplies = (parentNo) =>
    comments
      .filter((comment) => comment.parent_no === parentNo) // 부모 번호가 일치하는 대댓글만 필터링
      .map((reply) => (
        <ListGroupItem key={reply.comment_no} className="reply-item"> {/* 대댓글 항목 */}
          <div className="reply-content">
            <span className="reply-nickname">{reply.nick_name}</span> {/* 작성자 닉네임 */}
            <span className="reply-text">{reply.content}</span> {/* 대댓글 내용 */}
          </div>
          <div className="reply-meta">{formatDate(reply.created_at)}</div> {/* 작성 시간 */}
        </ListGroupItem>
      ));

  // 댓글 목록 렌더링
  return (
    <ListGroup className="comment-list">
      {comments
        .filter((comment) => comment.parent_no === null) // 부모가 없는 댓글만 필터링
        .map((comment) => (
          <ListGroupItem key={comment.comment_no} id={`comment-${comment.comment_no}`} className="comment-item"> {/* 댓글 항목 */}
            <div className="comment-header">
              <div className="user-nickname">{comment.nick_name}</div> {/* 작성자 닉네임 */}
              <div className="comment-content">{comment.content}</div> {/* 댓글 내용 */}
              <div className="comment-meta">{formatDate(comment.created_at)}</div> {/* 작성 시간 */}
            </div>
            <InputGroup className="reply-input"> {/* 대댓글 입력 필드 */}
              <Form.Control
                type="text"
                placeholder="대댓글을 입력하세요"
                value={reply.parent_no === comment.comment_no ? reply.content : ""}
                onChange={(e) => handleOnChange(e, comment.comment_no)}
              />
              <Button onClick={handleOnClick} disabled={isReplying}> {/* 대댓글 추가 버튼 */}
                {isReplying ? <Spinner animation="border" size="sm" /> : "답글 추가"}
              </Button>
            </InputGroup>
            <Button
              variant="link"
              className="toggle-replies-btn"
              onClick={() => toggleReplies(comment.comment_no)}
            >
              {openReplies[comment.comment_no]
                ? "댓글 닫기"
                : `댓글 열기 (${comments.filter((c) => c.parent_no === comment.comment_no).length})`}
            </Button>
            {openReplies[comment.comment_no] && renderReplies(comment.comment_no)} {/* 대댓글 표시 */}
          </ListGroupItem>
        ))}
    </ListGroup>
  );
};

// CommentList 컴포넌트를 외부에서 사용할 수 있도록 export
export default CommentList;
