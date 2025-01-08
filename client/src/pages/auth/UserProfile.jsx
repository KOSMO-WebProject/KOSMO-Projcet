import { Card, Button } from "react-bootstrap";
import Header from "../../components/includes/Header";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <div
        className="user-profile-container"
        style={{ maxWidth: "400px", margin: "20px auto" }}
      >
        {currentUser ? (
          <Card>
            <Card.Body>
              <Card.Title>Welcome, {currentUser.nickname}!</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {currentUser.email}
                <br />
                <strong>Phone:</strong> {currentUser.phone_number}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <div className="alert alert-warning" role="alert">
            회원가입이 또는 로그인이 필요합니다.
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
