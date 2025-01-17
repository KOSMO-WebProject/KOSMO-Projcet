import { useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import "./styles/CommentList.css";

const CommentList = ({ comments, addReply }) => {
  const [reply, setReply] = useState({
    parent_no: null,
    content: "",
  });

  const handleOnChange = (e, parentNo) => {
    setReply({
      parent_no: parentNo,
      content: e.target.value,
    });
  };

  const handleOnClick = () => {
    if (!reply.content.trim()) return;
    addReply(reply.parent_no, reply.content);
    setReply({ parent_no: null, content: "" }); // 입력 후 초기화
  };

  const renderReplies = (parentNo) => {
    const filteredReplies = comments.filter(
      (comment) => comment.parent_no === parentNo
    );

    return filteredReplies.map((reply) => (
      <ListGroupItem key={reply.comment_no} className="reply-item">
        <div>
          <strong>{reply.nick_name}</strong>
          <span className="comment-meta"> | {reply.created_at}</span>
        </div>
        <div className="comment-content">{reply.content}</div>
      </ListGroupItem>
    ));
  };

  return (
    <ListGroup className="comment-list">
      {comments
        .filter((comment) => comment.parent_no === null)
        .map((comment) => (
          <ListGroupItem key={comment.comment_no} className="comment-item">
            <div>
              <strong>{comment.nick_name}</strong>
              <span className="comment-meta"> | {comment.created_at}</span>
            </div>
            <div className="comment-content">{comment.content}</div>
            <InputGroup className="input-group">
              <Form.Control
                type="text"
                placeholder="대댓글을 입력하세요"
                value={
                  reply.parent_no === comment.comment_no ? reply.content : ""
                }
                onChange={(e) => handleOnChange(e, comment.comment_no)}
              />
              <Button onClick={handleOnClick}>대댓글 추가</Button>
            </InputGroup>
            {renderReplies(comment.comment_no)}
          </ListGroupItem>
        ))}
    </ListGroup>
  );
};

export default CommentList;
