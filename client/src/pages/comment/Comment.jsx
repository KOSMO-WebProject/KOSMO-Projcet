import React, { useState, useEffect } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import axios from 'axios';

const Comment = ({ userNo, noticeNo }) => {
    const [comments, setComments] = useState([]);
    const [replies, setReplies] = useState({
        parent_no: 0,
        notice_no : noticeNo,
        content : "",
        user_no: userNo
    });

    useEffect(() => {
        fetchComments();
    }, [noticeNo]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/comments/${noticeNo}`);
            setComments(response.data);
        } catch (error) {
            console.error('댓글 불러오기 실패:', error);
        }
    };

    const addReply = async (commentNo, content) => {
        try {
            const response = await axios.post('/comments/reply', {
                parent_no: Number(commentNo),
                notice_no: noticeNo,
                content: content,
                user_no: userNo,
            });
            fetchComments(); // 대댓글 추가 후 다시 데이터 로드
        } catch (error) {
            console.error('대댓글 추가 실패:', error);
        }
    };
    return (
        <div>
            <CommentInput userNo={userNo} noticeNo={noticeNo} fetchComments={fetchComments} />
            <CommentList comments={comments} addReply ={addReply}/>
        </div>
    );
};

export default Comment;
