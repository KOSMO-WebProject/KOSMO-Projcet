import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, InputGroup } from 'react-bootstrap';
import CommentList from './CommentList';

const CommentInput = ({ userId, noticeId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/comments/${noticeId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [noticeId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }
        try {
            const response = await axios.post(`/comments/write`, {
                user_id: userId,
                notice_id: noticeId,
                content: newComment
            });
            setComments(prev => [...prev]); 
            fetchComments()
            setNewComment(""); // 입력 필드 초기화
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleChange = (e) => {
        setNewComment(e.target.value);
    };

    return (
        <div>
            <Form onSubmit={handleCommentSubmit}>
                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="댓글을 입력하세요"
                        value={newComment}
                        name='content'
                        onChange={handleChange}
                    />
                    <Button variant="outline-secondary" type="submit">
                        댓글 추가
                    </Button>
                </InputGroup>
            </Form>
            <CommentList comments={comments} />
        </div>
    );
};

export default CommentInput;
