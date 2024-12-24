
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { Card, Button } from 'react-bootstrap';

const UserProfile = () => {
    const { currentUser, logout } = useAuth();
    const nav = useNavigate()
    const handleLogout = () =>{
        logout()
        nav("/")
    }
    return (
        <>
        <div className="user-profile-container" style={{ maxWidth: '400px', margin: '20px auto' }}>
        
            {currentUser ? (
                <Card>
                    <Card.Body>
                        <Card.Title>Welcome, {currentUser.nickname}!</Card.Title>
                        <Card.Text>
                            <strong>Email:</strong> {currentUser.email}<br/>
                            <strong>Phone:</strong> {currentUser.phonenumber}
                        </Card.Text>
                        <Button variant="primary" onClick={handleLogout}>Logout</Button>
                    </Card.Body>
                </Card>
            ) : (
                <div className="alert alert-warning" role="alert">
                    Please log in to view your profile.
                </div>
            )}
        </div>
        </>
    );
};

export default UserProfile;