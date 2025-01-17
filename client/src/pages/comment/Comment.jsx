import React, { useState, useEffect } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import axios from "axios";
import "./styles/Comment.css";

const Comment = ({ userNo, noticeNo }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [noticeNo]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/comments/${noticeNo}`);
      setComments(response.data);
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
  };

  const addReply = async (parentNo, content) => {
    try {
      await axios.post("/comments/reply", {
        parent_no: parentNo,
        notice_no: noticeNo,
        content: content,
        user_no: userNo,
      });
      fetchComments();
    } catch (error) {
      console.error("대댓글 추가 실패:", error);
    }
  };

  return (
    <div className="comment-container">
      <CommentInput
        userNo={userNo}
        noticeNo={noticeNo}
        fetchComments={fetchComments}
      />
      <CommentList comments={comments} addReply={addReply} />
    </div>
  );
};

export default Comment;
