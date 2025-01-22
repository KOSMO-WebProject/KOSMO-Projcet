// React: QnaDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Modal, ListGroup, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import Comment from "../comment/Comment";
import Header from "../../components/includes/Header";
import Footer from "../../components/includes/Footer";
import "./QnaDetail.css";

const QnaDetail = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  const [qna, setQna] = useState({
    qna_no: 0,
    title: "",
    content: "",
    nick_name: "",
    user_no: 0,
    create_at: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const [editContent, setEditContent] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await axios.get(`/qnas/${id}`);
      setQna(res.data);
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

  const qnaDelete = async () => {
    try {
      const response = await axios.delete(`/qnas/${id}`);
      if(response.status === 200){
        alert("글 삭제가 완료 되었습니다.");
        navigate("/qna");
      }
      else {
        alert("글 삭제에 실패했습니다.")
      }
    } catch (error) {
      alert(error.response?.data || "알 수 없는 오류가 발생했습니다.");
    }
  };

  const qnaUpdate = async () => {
    if (!qna.title.trim() || !editContent.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    try {
      const response = await axios.put(`/qnas/${id}`, {
        title: qna.title,
        content: editContent,
      });
      alert(response.data);
      fetchData();
      handleClose();
    } catch (error) {
      alert(error.response?.data || "알 수 없는 오류가 발생했습니다.");
    }
  };

  console.log(qna);
  console.log(currentUser);

  return (
    <>
      <Header />
      <div className="qna-detail-container">
        {loading ? (
          <div className="loading-spinner">
            <Spinner animation="border" />
          </div>
        ) : errorMessage ? (
          <div className="error-message">{errorMessage}</div>
        ) : (
          <div className="qna-detail-content-container">
            <Card className="qna-card">
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <div className="row-structure">
                    <strong>제목</strong>
                    <div>{qna.title}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="row-structure">
                    <strong>작성자</strong>
                    <div>{qna.nick_name}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="row-structure">
                    <strong>작성 날짜</strong>
                    <div>{qna.create_at.substring(0, 10)}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="row-structure">
                    <strong>내용</strong>
                    <div
                      style={{ minHeight: "200px", textAlign: "left" }}
                      dangerouslySetInnerHTML={{ __html: qna.content }}
                    />
                  </div>
                </ListGroup.Item>
              </ListGroup>
              {currentUser && currentUser.user_no === qna.user_no ? (
                <div className="button-group">
                  <Button variant="primary" onClick={handleShow}>
                    수정
                  </Button>
                  <Button variant="danger" onClick={qnaDelete}>
                    삭제
                  </Button>
                  <Button variant="secondary" onClick={() => navigate("/qna")}>
                    목록
                  </Button>
                </div>
              ) : (
                <div className="button-group">
                  <Button variant="secondary" onClick={() => navigate("/qna")}>
                    목록
                  </Button>
                </div>
              )}

              <Comment
                userNo={currentUser ? currentUser.user_no : null}
                qnaNo={qna.qna_no}
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
                  value={qna.title}
                  onChange={(e) => setQna({ ...qna, title: e.target.value })}
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
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={qnaUpdate}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default QnaDetail;
