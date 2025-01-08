import { useState } from 'react';
import { Button, Form, InputGroup, ListGroup, ListGroupItem } from 'react-bootstrap';

const CommentList = ({ comments, addReply }) => {
    const [reply, setReply] = useState({
        parent_no: null,
        content: "",
    });

    const handleOnChange = (e, parentNo) => {
        setReply({
            parentNo,
            content: e.target.value,
        });
    };

    const handleOnClick = () => {
        if (!reply.content.trim()) return;
        addReply(reply.parentNo, reply.content);
        setReply({ parentNo: null, content: "" }); // 입력 후 초기화
    };

    const renderReplies = (replies, commentNo) => {
        // parent_id가 comment_id와 동일한 replies만 필터링
        const filteredReplies = replies.filter(reply => reply.parent_no === commentNo);

        return filteredReplies.map((reply) => (
            <ListGroupItem key={reply.comment_no} className="ms-4">
                <strong>{reply.nickname}</strong>: {reply.content}
                <hr />
                작성 날짜 : {reply.created_at}
            </ListGroupItem>
        ));
    };

    return (
        <ListGroup>
            {!comments.parent_no && comments.map((comment) => (
                <ListGroupItem key={comment.comment_no}>
                    <strong>{comment.nick_name}</strong>: {comment.content} <hr />
                    작성 날짜 : {comment.created_at}
                    {/* 대댓글 입력 */}
                    <InputGroup className="mt-2">
                        <Form.Control
                            type="text"
                            placeholder="대댓글을 입력하세요"
                            value={reply.parentNo === comment.comment_no ? reply.content : ""}
                            onChange={(e) => handleOnChange(e, comment.comment_no)}
                        />
                        <Button onClick={handleOnClick}>대댓글 추가</Button>
                    </InputGroup>
                    {comments.parentNo && renderReplies(comments,comment.comment_no)}
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default CommentList;
