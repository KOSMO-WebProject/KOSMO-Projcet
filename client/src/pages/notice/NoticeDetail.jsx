import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NoticeDetail = () => {
    const { id } = useParams();
    console.log(id);
    const [notice, setNotice] = useState("");

    useEffect(() => {
        axios.get(`/notices/${id}`)
            .then(res => {
                setNotice(res.data);
            })
            .catch(err => console.error(err));
        console.log(notice);
    }, []); // 의존성 배열이라 notice_id가 변경될 때마다 useEffect가 실행된다.


    return (
        <div>
            NoticeDetail
        </div>
    );
}

export default NoticeDetail;