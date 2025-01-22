import React from "react";
import { Link } from "react-router-dom";
import "./QnaItem.css";

const QnaItem = ({ qna }) => {
  
  return (
    <tr>
      <td>{qna.qna_no}</td>
      <td>
        <Link
          to={`/qna/${qna.qna_no}`}
          className={`qna-title-link ${qna.isRead ? "read" : ""}`}
        >
          {qna.title}
        </Link>
      </td>
      <td>{qna.nick_name}</td>
      <td>{new Date(qna.create_at).toLocaleDateString()}</td>
    </tr>
  );
};

export default QnaItem;
