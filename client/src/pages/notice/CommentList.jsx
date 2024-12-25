

import { Button, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';

const CommentList = ({ userId, comments }) => {
    return (
        <ListGroup>
            {comments.map((comment, index) => (
                <ListGroupItem key={index}>
                    <Row>
                        <Col xs={8} md={10}>
                            <strong>{comment.nickname}</strong>: {comment.content}
                        </Col>
                        <Col xs={4} md={2} className="text-right">
                           댓글 작성 날짜  {comment.created_at}
                        </Col>
                        <Col md={12} className="mt-2">
                            <Button size="sm" >댓글</Button>
                        </Col>
                    </Row>
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default CommentList;