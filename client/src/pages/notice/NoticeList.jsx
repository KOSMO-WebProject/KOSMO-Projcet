import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NoticeList.css' 
import axios from 'axios'



const NoticeList = () => {
  const [notices,setNotices] = useState([])

  useEffect(()=>{
    axios.get("/notices")
    .then(res=>res.data)
    .then(res=>setNotices(res))
  },[])
  console.log(notices);
  
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
          {notices.map(notice => (
            <tr key={notice.notice_id}>
              <td>{notice.notice_id}</td>
              <td><Link to={`/notice/${notice.notice_id}`}>{notice.title}</Link></td>
              <td>{notice.user_name}</td>
              <td>{notice.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default NoticeList;