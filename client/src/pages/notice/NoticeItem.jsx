import React from 'react';
import { Link } from 'react-router-dom';
import './NoticeItem.css';

const NoticeItem = ({ notice }) => {
  const formattedDate = new Date(notice.create_at).toLocaleDateString('ko-KR');

  return (
    <tr>
      <td>{notice.notice_no}</td>
      <td>
        <Link to={`/notice/${notice.notice_no}`} className="notice-title-link">
          {notice.title}
        </Link>
      </td>
      <td>{notice.nick_name}</td>
      <td>{formattedDate}</td>
    </tr>
  );
};

export default NoticeItem;
