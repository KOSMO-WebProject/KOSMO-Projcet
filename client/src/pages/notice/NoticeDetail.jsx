import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Form, ListGroup, Modal, ListGroupItem } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import CommentInput from './CommentInput';



const NoticeDetail = () => {
    const { currentUser } = useAuth()
    const { id } = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState({
        notice_id : 0, 
        title : "",
        content: "",
    });

    const [show,setShow] = useState(false)
      const handleShow = () => setShow(true)
      const handleClose = () => setShow(false)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`/notices/${id}`);
                setNotice(res.data);
            } catch (error) {
                console.error('Error fetching notice data:', error);
            }
        }
        fetchData();
    }, []);

    const handleChangeForm = (e) => {
        setNotice((prev) => ({
            ...prev,
            notice_id:id,
            [e.target.name] : e.target.value
          }))

    }


    const noticeDelete = async () => {
        try {
            await axios.delete(`/notices/${id}`, {notice_id  : id});
            alert('게시글이 삭제되었습니다.');
            navigate('/notice');

        } catch (error) {
            console.error('Error deleting the notice:', error);
        }
    };

    const noticeUpdate = async() => {
        try {
            axios.put(`/notices/${id}`,notice)
            alert("게시글이 수정되었습니다.")
            handleClose()
        } catch (error) {
            console.error(error)
        }
    }

    const noticeList = () => {
        navigate(-1)
    }

    return (
        <>
    <div className='container'>
        <div className='page-header'/>
            <h2>공지사항<small>글목록</small></h2>
            <hr/>
            <Card style={{ width: '58rem' }}>
        <Card.Body>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>제목 : {notice.title}</ListGroupItem> 
          <ListGroupItem>작성자 : {notice.nickname}</ListGroupItem>
          <ListGroupItem>내용 : {notice.content}</ListGroupItem>
        </ListGroup>
        <div className='detail-link'>
          {currentUser && currentUser.user_id === notice.userid &&<Button variant="primary" onClick={handleShow}>
            수정
          </Button>}
          &nbsp;
          {currentUser && currentUser.user_id === notice.userid && <Button variant="primary" onClick={noticeDelete}>
            삭제
          </Button>}
          &nbsp;
          <Button variant="primary" onClick={noticeList}>
            목록
          </Button>
          {/* <Link to="/notice"nvariant="primary" className='nav-link'>공지목록</Link> */}
        </div>
         <CommentInput userId = {currentUser?currentUser.user_id:null}noticeId={notice.notice_id}/>
      </Card>   
      <hr />
    </div>


    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>글수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id="f_board">
          <Form.Group className="mb-3" controlId="boardTitle">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" name="title" value={notice.title} onChange={handleChangeForm} placeholder="Enter 제목" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="boardWriter">
            <Form.Label>작성자</Form.Label>
            <Form.Control type="text"  value={notice.nickname} onChange={handleChangeForm} placeholder="Enter 작성자" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="boardContent">
            <Form.Label>내용</Form.Label>
            <textarea className="form-control" name='content' value={notice.content} onChange={handleChangeForm} rows="3"></textarea>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={noticeUpdate}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>  

      </>
    );
};

export default NoticeDetail;
