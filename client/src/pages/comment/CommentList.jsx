

import { Button, Form, InputGroup, ListGroup, ListGroupItem } from 'react-bootstrap';

const CommentList = ({ comments, addReply }) => {
    console.log(comments)
    console.log(addReply)
    addReply()
    const handleOnChange = (e) =>{
        console.log(e.target.value)
        console.log(e.target.name)
    }
    

    return (
        <ListGroup>
            {comments.map((comment, index) => (
                <ListGroupItem key={index}>
                    <strong>{comment.nickname}</strong>: {comment.content} <hr/>
                    작성 날짜 : {comment.created_at}
                    <InputGroup className="mt-2"> 
                        <Form.Control
                            type="text"
                            placeholder="댓글을 입력하세요"
                            name={comment.comment_id}
                            onChange={handleOnChange}
                        />
                        <Button>댓글 추가</Button>
                    </InputGroup>
                    {/* Display replies here if any */}
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default CommentList;