import React from 'react'
import { Link } from 'react-router'

const NoticeItem = ({notice}) => {
    console.log(notice)
  return (
    <>
      <tr>
        <td>{notice.notice_id}</td>
        <td>
          {/* <Route path="/notice/:n_no" exact={true} element={<NoticeDetail />}/> */}
          <Link to={"/notice/"+notice.notice_id} className='btn btn-primary'>{notice.title}</Link>
        </td>
        <td>{notice.nickname}</td>
        <td>{notice.create_at}</td>
      </tr>
    </>
  )
}

export default NoticeItem
