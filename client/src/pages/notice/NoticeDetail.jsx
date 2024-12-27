// NoticeDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Modal, ListGroup, Form } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import Comment from '../comment/Comment';

const NoticeDetail = () => {
    const { currentUser } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState({ notice_id: 0, title: "", content: "", nickname: "" });
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/notices/${id}`);
                setNotice(res.data);
            } catch (error) {
                console.error('Error fetching notice data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleChangeForm = (e) => {
        setNotice({ ...notice, [e.target.name]: e.target.value });
    };

    const noticeDelete = async () => {
        try {
            await axios.delete(`/notices/${id}`);
            alert('게시글이 삭제되었습니다.');
            navigate('/notice');
        } catch (error) {
            console.error('Error deleting the notice:', error);
        }
    };

    const noticeUpdate = async () => {
        try {
            await axios.put(`/notices/${id}`, notice);
            alert("게시글이 수정되었습니다.");
            handleClose();
        } catch (error) {
            console.error('Error updating the notice:', error);
        }
    };

    const noticeList = () => {
        navigate(-1);
    };

    return (
        <>
            <div className='container'>
                <h2>공지사항 상세보기</h2>
                <Card>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>제목: {notice.title}</ListGroup.Item>
                        <ListGroup.Item>작성자: {notice.nickname}</ListGroup.Item>
                        <ListGroup.Item>내용: {notice.content}</ListGroup.Item>
                    </ListGroup>
                    <div className='button-group'>
                        {currentUser && currentUser.user_id === notice.userid && <>
                            <Button variant="primary" onClick={handleShow}>수정</Button>
                            <Button variant="danger" onClick={noticeDelete}>삭제</Button>
                        </>}
                        <Button variant="secondary" onClick={noticeList}>목록</Button>
                    </div>
                    {/* <CommentInput userId={currentUser?.user_id} noticeId={notice.notice_id} /> */}
                    <Comment userId={currentUser?currentUser.user_id:null} noticeId={notice.notice_id}/>
                </Card>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>글 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>제목</Form.Label>
                            <Form.Control type="text" name="title" value={notice.title} onChange={handleChangeForm} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>내용</Form.Label>
                            <Form.Control as="textarea" name="content" rows={3} value={notice.content} onChange={handleChangeForm} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>닫기</Button>
                    <Button variant="primary" onClick={noticeUpdate}>저장</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NoticeDetail;
