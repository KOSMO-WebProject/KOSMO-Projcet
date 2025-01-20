import React from "react";
import { Link } from "react-router-dom";
import "./NoticeItem.css";

const NoticeItem = ({ notice }) => {
  return (
    <tr>
      <td>{notice.notice_no}</td>
      <td>
        <Link
          to={`/notice/${notice.notice_no}`}
          className={`notice-title-link ${notice.isRead ? "read" : ""}`}
        >
          {notice.title}
        </Link>
      </td>
      <td>{notice.nick_name}</td>
      <td>{new Date(notice.create_at).toLocaleDateString()}</td>
    </tr>
  );
};

export default NoticeItem;
