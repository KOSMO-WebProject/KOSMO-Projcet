import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css' 
import axios from 'axios'



const PostList = () => {
  const [posts,setPosts] = useState([])

  useEffect(()=>{
    axios.get("/posts")
    .then(res=>res.data)
    .then(res=>setPosts(res))
  },[])
  
  return (
    <div className="board-list">
      <h1>공지사항</h1>
      <table>
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
              <td>{post.nickname}</td>
              <td>{post.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default PostList;