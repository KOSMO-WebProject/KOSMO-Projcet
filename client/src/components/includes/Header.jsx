// Header.jsx
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';




const Header = () => {
    const { currentUser, logout , login} = useAuth();
    console.log(currentUser,logout, login)
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img src="/images/logo.png" alt="Logo" style={{ width: '100px' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/calendar" className="nav-link">Calendar</Link>
                        <Link to="/community_list" className="nav-link">Community</Link>
                        <Link to="/theater_list" className="nav-link">Theater</Link>
                        <Link to="/Profile" className="nav-link">마이페이지</Link>
                    </Nav>
                    <Nav>
                        {currentUser ? (
                            <>
                                <span className="navbar-text me-3">
                                    Hello, {currentUser.nickname}!
                                </span>
                                <Button variant="outline-danger" onClick={logout}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link">Login</Link>
                                <Link to="/register" className="nav-link"><i className='fa-regular fa-user'></i> Register</Link>
                            </>
                        )}
                        <Link to="/notice" className="nav-link">Notice</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
