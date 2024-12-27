import { useState } from 'react';
import { Button, Form, InputGroup, ListGroup, ListGroupItem } from 'react-bootstrap';

const CommentList = ({ comments, addReply }) => {
    console.log(comments);
    const [reply, setReply] = useState({
        parentId: null,
        content: "",
    });

    const handleOnChange = (e, parentId) => {
        setReply({
            parentId,
            content: e.target.value,
        });
    };

    const handleOnClick = () => {
        if (!reply.content.trim()) return;
        addReply(reply.parentId, reply.content);
        setReply({ parentId: null, content: "" }); // 입력 후 초기화
    };

    const renderReplies = (replies, commentId) => {
        // parent_id가 comment_id와 동일한 replies만 필터링
        const filteredReplies = replies.filter(reply => reply.parent_id === commentId);

        return filteredReplies.map((reply) => (
            <ListGroupItem key={reply.comment_id} className="ms-4">
                <strong>{reply.nickname}</strong>: {reply.content}
                <hr />
                작성 날짜 : {reply.created_at}
            </ListGroupItem>
        ));
    };

    return (
        <ListGroup>
            {!comments.parent_id && comments.map((comment) => (
                <ListGroupItem key={comment.comment_id}>
                    <strong>{comment.nickname}</strong>: {comment.content} <hr />
                    작성 날짜 : {comment.created_at}
                    {/* 대댓글 입력 */}
                    <InputGroup className="mt-2">
                        <Form.Control
                            type="text"
                            placeholder="대댓글을 입력하세요"
                            value={reply.parentId === comment.comment_id ? reply.content : ""}
                            onChange={(e) => handleOnChange(e, comment.comment_id)}
                        />
                        <Button onClick={handleOnClick}>대댓글 추가</Button>
                    </InputGroup>
                    {comments.parentId && renderReplies(comments,comment.comment_id)}
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default CommentList;
