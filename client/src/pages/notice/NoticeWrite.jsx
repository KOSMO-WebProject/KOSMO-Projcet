import React, { useState } from 'react';
import { Container, Button, Row, Col, Form, FormControl } from 'react-bootstrap';
import ReactQuill from 'react-quill-new'; // 라이브러리 이름 확인
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const NoticeWrite = () => {
    const { currentUser } = useAuth()
    const { user_id } = currentUser
    const nav = useNavigate() 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e) => {
    setTitle(e.target.value);
    };

    const handleContentChange = (value) => {
    setContent(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitted Content:', { title, content, user_id });
    
        const postData = {
            title,
            content,
            user_id
        };
        
        try {
            const response = await axios.post("/notices/write", postData, {
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization': 'Bearer yourToken' // 인증이 필요한 경우
                }
            });
            alert("글등록이 완료되었습니다.")
            nav("/notice")
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    const handleCancel = () => {
        nav("/notice")
    };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Form onSubmit={handleSubmit}>
            <h1 className="text-center mb-4">게시판 작성</h1>
            <Form.Group className="mb-3">
              <Form.Label>제목</Form.Label>
              <FormControl
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={handleTitleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleContentChange}
                style={{ height: '400px', marginBottom: '20px' }} // 에디터의 높이 조정
              />
            </Form.Group>
            <Row className="mt-5">
              <Col md={6}>
                <Button type="submit" size="lg" className="w-100">글 등록</Button>
              </Col>
              <Col md={6}>
                <Button variant="secondary" size="lg" className="w-100" onClick={handleCancel}>목록</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NoticeWrite;
