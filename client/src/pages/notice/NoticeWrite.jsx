import React, { useState } from 'react';
import { Container, Button, Row, Col, Form, FormControl } from 'react-bootstrap';
import ReactQuill from 'react-quill-new'; // 라이브러리 이름 확인 및 수정
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const NoticeWrite = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: currentUser ? currentUser.user_id : null,
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const name = e.target ? e.target.name : 'content';
    const value = e.target ? e.target.value : e;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    try {
      const response = await axios.post("/notices/write", formData);
      alert("글등록이 완료되었습니다.");
      navigate("/notice");
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleCancel = () => {
    navigate("/notice");
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
                name="title"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleChange}
                style={{ height: '400px', marginBottom: '20px' }}
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
