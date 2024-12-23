import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Button, Form, ListGroup, Row, Col } from 'react-bootstrap';

const NoticeDetail = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`/notices/${id}`);
                setNotice({
                    ...res.data,
            
            })
                console.log(notice)
                // setComments(res.comments);
            } catch (error) {
                console.error('Error fetching notice data:', error);
            }
        }
        fetchData();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/comments`, { noticeId: id, text: newComment });
            setComments([...comments, data.comment]);
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <Container className="my-5">
            <Card>
                <Card.Header as="h3">{notice.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {notice.content}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Form onSubmit={handleCommentSubmit} className="my-3">
                <Form.Group as={Row} className="mb-3">
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            placeholder="댓글을 입력하세요"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                    </Col>
                    <Col sm="2">
                        <Button type="submit">댓글 작성</Button>
                    </Col>
                </Form.Group>
            </Form>
            <ListGroup>
                {comments && comments.map((comment, index) => (
                    <ListGroup.Item key={index}>
                        {comment.text}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default NoticeDetail;
