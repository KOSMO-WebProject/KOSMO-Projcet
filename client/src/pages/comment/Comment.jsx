import React, { useState, useEffect } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import axios from "axios";

const Comment = ({ userId, noticeId }) => {
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState({
    parent_id: 0,
    notice_id: noticeId,
    content: "",
    user_id: userId,
  });

  useEffect(() => {
    fetchComments();
  }, [noticeId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/comments/${noticeId}`);
      setComments(response.data);
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
  };

  const addReply = async (commentId, content) => {
    try {
      const response = await axios.post("/comments/reply", {
        parent_id: Number(commentId),
        notice_id: noticeId,
        content: content,
        user_id: userId,
      });
      fetchComments(); // 대댓글 추가 후 다시 데이터 로드
    } catch (error) {
      console.error("대댓글 추가 실패:", error);
    }
  };
  return (
    <div>
      <CommentInput
        userId={userId}
        noticeId={noticeId}
        fetchComments={fetchComments}
      />
      <CommentList comments={comments} addReply={addReply} />
    </div>
  );
};

export default Comment;
