import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
// URL이 바뀌지 않게 하기 위해서 필요한 라이브러리 >> 제일 하단 내용 참고
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    //아래 부분이 화면 처리부
    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container className='container' >
                    <Navbar.Brand href="/" >
                    <img src="/images/logo.png" alt="Logo" width="44" height="20" />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/calendar" className="nav-link">Calendar</Link>
                        <Link to="/community_list" className="nav-link">Community</Link>
                        <Link to="/theater_list" className="nav-link">Theater</Link>
                        <Link to="/login" className="nav-link">Login</Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header