import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState("");

    useEffect(() => {
        axios.get(`/posts/${id}`)
            .then(res => {
                setPost(res.data);
            })
            .catch(err => console.error(err));
    }, [id]); // 의존성 배열이라 id가 변경될 때마다 useEffect가 실행된다.

    if (!post) return <div>Loading...</div>; // 데이터 로딩 중 표시

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <small>작성자: {post.nickname}</small>
            <br />
            <small>등록일: {post.createdAt}</small>
        </div>
    );
}

export default PostDetail;