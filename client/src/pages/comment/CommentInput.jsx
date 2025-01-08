import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import {createGlobalStyle} from "styled-components";

const CommentInput = ({ userNo, noticeNo, fetchComments }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment) return;
        try {
            const response = await axios.post(`/comments/write`, {
                user_no: userNo,
                notice_no: noticeNo,
                content: comment
            });
            fetchComments(); 
            setComment(""); 
        } catch (error) {
            console.error('댓글 등록 실패:', error);
        }
    };

    return (
        <Form onSubmit={handleCommentSubmit}>
            <InputGroup className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="댓글을 입력하세요"
                    value={comment}
                    onChange={handleCommentChange}
                />
                <Button variant="outline-secondary" type="submit">
                    댓글 추가
                </Button>
            </InputGroup>
        </Form>
    );
};

export default CommentInput;
