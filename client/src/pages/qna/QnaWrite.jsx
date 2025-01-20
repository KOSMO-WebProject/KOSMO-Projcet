import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import "./QnaWrite.css";
import "quill/dist/quill.snow.css";
import Footer from "../../components/includes/Footer";
import Header from "../../components/includes/Header";
import Quill from "quill";

const QnaWrite = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_no: currentUser?.user_no || null, // 백엔드에서 필요한 user_no
    title: "", // 공지사항 제목
    content: "", // 공지사항 내용
    category: "", // 분류 선택
  });
  const [isLoading, setIsLoading] = useState(false);

  const quillRef = useRef(null); // Quill 에디터 DOM 요소
  const quillInstance = useRef(null); // Quill 인스턴스

  useEffect(() => {
    if (!quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ align: [] }],
          ],
        },
      });

      // Quill 에디터 기본 정렬 설정: 왼쪽 정렬
      quillInstance.current.format("align", "left");

      // Quill에서 텍스트 변경 시 formData와 동기화
      quillInstance.current.on("text-change", () => {
        setFormData((prev) => ({
          ...prev,
          content: quillInstance.current.root.innerHTML,
        }));
      });
    }

    // 기존 내용이 있으면 Quill 에디터에 로드
    if (formData.content) {
      quillInstance.current.root.innerHTML = formData.content;
    }
  }, [formData.content]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 분류 및 필수 입력값 확인
    if (!formData.category) {
      alert("게시글 분류를 선택하세요.");
      return;
    }
    if (!formData.title || !formData.content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // 제목에 분류 추가
      const modifiedTitle = `[${formData.category}] ${formData.title}`;
      const dataToSubmit = {
        title: modifiedTitle,
        content: formData.content,
        user_no: formData.user_no, // 백엔드에서 필요한 user_no 필드
      };

      console.log("Submitting data:", dataToSubmit); // 디버깅용

      await axios.post("/qnas/write", dataToSubmit);
      alert("글등록이 완료되었습니다.");
      navigate("/qna");
    } catch (error) {
      console.error(
        "Error posting data:",
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.message ||
        "글 등록 중 오류가 발생했습니다. 다시 시도해주세요.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/qna");
  };

  useEffect(() => {
    document.querySelector(".qna-title-input")?.focus();
  }, []);

  return (
    <div className="qna-write-container">
      <Header />
      <div className="qna-write-content">
        <h1 className="qna-write-title">글쓰기</h1>
        <div className="qna-write-content-container">
          <form className="qna-write-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <select
                name="category"
                className="qna-category"
                onChange={handleChange}
                value={formData.category || ""}
              >
                <option value="">분류</option>
                <option value="배송문의">배송문의</option>
                <option value="교환반품">교환반품</option>
                <option value="취소변경">취소변경</option>
                <option value="입금문의">입금문의</option>
                <option value="기타문의">기타문의</option>
              </select>
              <input
                type="text"
                name="title"
                className="qna-title-input"
                placeholder="제목을 입력해주세요."
                onChange={handleChange}
                value={formData.title}
              />
            </div>

            {/* Quill 에디터 영역 */}
            <div
              ref={quillRef}
              className="qna-content-input ql-container ql-snow"
            />

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
      <div style={{ height: "50px" }}></div>
      <Footer />
    </div>
  );
};

export default QnaWrite;
