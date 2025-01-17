// React: NoticeDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Modal, ListGroup, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import Comment from "../comment/Comment";
import Header from "../../components/includes/Header";
import Footer from "../../components/includes/Footer";
import "./NoticeDetail.css";

const NoticeDetail = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
 

  const [notice, setNotice] = useState({
    notice_no: 0,
    title: "",
    content: "",
    nick_name: "",
    user_no: 0,
    create_at: "",
    likes: 0,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const [editContent, setEditContent] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await axios.get(`/notices/${id}`);
      setNotice(res.data);
      setEditContent(res.data.content);
    } catch (error) {
      setErrorMessage("게시글 정보를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleContentChange = (e) => {
    setEditContent(e.target.value);
  };

  const noticeDelete = async () => {
    try {
      const response = await axios.delete(`/notices/${id}`);
      alert(response.data);
      navigate("/notice");
    } catch (error) {
      alert(error.response?.data || "알 수 없는 오류가 발생했습니다.");
    }
  };

  const noticeUpdate = async () => {
    if (!notice.title.trim() || !editContent.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    try {
      const response = await axios.put(`/notices/${id}`, {
        title: notice.title,
        content: editContent,
      });
      alert(response.data);
      fetchData();
      handleClose();
    } catch (error) {
      alert(error.response?.data || "알 수 없는 오류가 발생했습니다.");
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(`/notices/${id}/like`);
      setNotice((prev) => ({ ...prev, likes: prev.likes + 1 }));
    } catch (error) {
      console.error("Error liking notice:", error);
    }
  };

  console.log(notice)
  console.log(currentUser)

  return (
    <>
      <Header />
      <div className="notice-detail-container">
        {loading ? (
          <div className="loading-spinner">
            <Spinner animation="border" />
          </div>
        ) : errorMessage ? (
          <div className="error-message">{errorMessage}</div>
        ) : (
          <div className="notice-detail-content-container">
            <Card className="notice-card">
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <div className="row-structure">
                    <strong>제목</strong>
                    <div>{notice.title}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="row-structure">
                    <strong>작성자</strong>
                    <div>{notice.nick_name}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="row-structure">
                    <strong>작성 날짜</strong>
                    <div>{notice.create_at}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="row-structure">
                    <strong>좋아요</strong>
                    <div>{notice.likes}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="row-structure">
                    <strong>내용</strong>
                    <div
                      style={{ minHeight: "200px", textAlign: "left" }}
                      dangerouslySetInnerHTML={{ __html: notice.content }}
                    />
                  </div>
                </ListGroup.Item>
              </ListGroup>
            {currentUser && currentUser.user_no === notice.userno ?
              <div className="button-group">
                <Button variant="primary" onClick={handleShow}>수정</Button>
                <Button variant="danger" onClick={noticeDelete}>삭제</Button>
                <Button variant="secondary" onClick={() => navigate("/notice")}>목록</Button>
              </div>
        :
              <div className="button-group">
                <Button variant="secondary" onClick={() => navigate("/notice")}>목록</Button>
              </div>
}

              <Comment
                userNo={currentUser ? currentUser.user_no : null}
                noticeNo={notice.notice_no}
              />
            </Card>
          </div>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>글 수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  value={notice.title}
                  onChange={(e) => setNotice({ ...notice, title: e.target.value })}
                  placeholder="제목을 입력해주세요."
                />
              </div>
              <textarea
                value={editContent}
                onChange={handleContentChange}
                rows="10"
                placeholder="내용을 입력해주세요."
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>닫기</Button>
            <Button variant="primary" onClick={noticeUpdate}>저장</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default NoticeDetail;
