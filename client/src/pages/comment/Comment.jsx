import React, { useState, useEffect } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import axios from 'axios';

const Comment = ({ userId, noticeId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, [noticeId]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/comments/${noticeId}`);
            setComments(response.data);
        } catch (error) {
            console.error('댓글 불러오기 실패:', error);
        }
    };

    const addReply = async (commentId, content) => {
        if (!content) return; 
        try {
            const response = await axios.post('/comments/reply', {
                parent_id: commentId, 
                content: content,   
                user_id: userId       
            });
    
            fetchComments(); 

        } catch (error) {
            console.error('Adding reply failed:', error);
        }
    };

    return (
        <div>
            <CommentInput userId={userId} noticeId={noticeId} fetchComments={fetchComments} />
            <CommentList comments={comments} addReply ={addReply}/>
        </div>
    );
};

export default Comment;
