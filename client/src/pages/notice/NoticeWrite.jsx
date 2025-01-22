import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import "./NoticeWrite.css";
import "quill/dist/quill.snow.css";
import Footer from "../../components/includes/Footer";
import Header from "../../components/includes/Header";
import Quill from "quill";

const NoticeWrite = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_no: currentUser?.user_no || null,
    title: "",
    content: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const quillRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
      });

      quillInstance.current.on("text-change", () => {
        setFormData((prev) => ({
          ...prev,
          content: quillInstance.current.root.innerHTML,
        }));
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) {
      alert("게시글 분류를 선택하세요.");
      return;
    }
    if (!formData.title) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!quillInstance.current.root.innerText.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    setIsLoading(true);
    try {
      const modifiedTitle = `[${formData.category}] ${formData.title}`;
      const dataToSubmit = {
        title: modifiedTitle,
        content: formData.content,
        user_no: formData.user_no,
      };
      await axios.post("/notices/write", dataToSubmit);
      alert("글등록이 완료되었습니다.");
      navigate("/notice");
    } catch (error) {
      console.error(
        "Error posting data:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "글 등록 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsLoading(false);
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
                value={formData.category || ""}
              >
                <option value="">분류</option>
                <option value="공지사항">공지사항</option>
                <option value="이벤트">이벤트</option>
                <option value="안내">안내</option>
              </select>
              <input
                type="text"
                name="title"
                className="notice-title-input"
                placeholder="제목을 입력해주세요."
                onChange={handleChange}
                value={formData.title}
              />
            </div>
            <div ref={quillRef} className="ql-container" />
            <div className="form-buttons">
              <button
                type="submit"
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? "작성 중..." : "글쓰기"}
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
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