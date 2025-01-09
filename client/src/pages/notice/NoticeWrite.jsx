import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import "./NoticeWrite.css";
import 'quill/dist/quill.snow.css';
import Footer from "../../components/includes/Footer";
import Header from "../../components/includes/Header";
import Quill from 'quill';

const NoticeWrite = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_no: currentUser?.user_no || null,
    title: "",
    content: "",
  });

  const quillRef = useRef(null);  // Quill 에디터를 바인딩할 참조

  useEffect(() => {
    const quill = new Quill(quillRef.current, {
      theme: 'snow',
    });
    quill.on('text-change', function () {
      setFormData(prev => ({ ...prev, content: quill.root.innerHTML })); // 툴바와 내용 입력 간의 연결
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/notices/write", formData);
      alert("글등록이 완료되었습니다.");
      navigate("/notice");
    } catch (error) {
      console.error("Error posting data:", error);
      alert("글 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleCancel = () => {
    navigate("/notice");
  };

  return (
    <div className="notice-write-container">
      <Header />
      <div className="notice-write-content">
        <h1 className="notice-write-title">글쓰기</h1>
        <div className="notice-write-content-container">
          <form className="notice-write-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <select
                name="category"
                className="notice-category"
                onChange={handleChange}
              >
                <option value="">분류</option>
                <option value="공지사항">공지사항</option>
                <option value="이벤트">이벤트</option>
              </select>
              <input
                type="text"
                name="title"
                className="notice-title-input"
                placeholder="제목을 입력해주세요."
                onChange={handleChange}
              />
            </div>

            {/* Quill 툴바 및 내용 입력란 */}
            <div className="ql-toolbar">
              {/* 툴바는 Quill 라이브러리가 자동으로 처리 */}
            </div>
            <div ref={quillRef} className="notice-content-input ql-container ql-snow" />

            <div className="form-buttons">
              <button type="submit" className="submit-button">
                글쓰기
              </button>
              <button type="button" className="cancel-button" onClick={handleCancel}>
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NoticeWrite;
