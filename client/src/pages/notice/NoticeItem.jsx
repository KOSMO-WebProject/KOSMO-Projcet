import React from "react";
import { Link } from "react-router";

const NoticeItem = ({ notice }) => {
  console.log(notice);
  return (
    <>
      <tr>
        <td>{notice.notice_no}</td>
        <td>
          {/* <Route path="/notice/:n_no" exact={true} element={<NoticeDetail />}/> */}
          <Link to={"/notice/" + notice.notice_no} className="btn btn-primary">
            {notice.title}
          </Link>
        </td>
        <td>{notice.nick_name}</td>
        <td>{notice.create_at}</td>
      </tr>
    </>
  );
};

export default NoticeItem;
