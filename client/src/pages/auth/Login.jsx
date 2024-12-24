
import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const nav = useNavigate()
    const { login } = useAuth()
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('ID:', id, 'Password:', password);
        try {
            
            login(id,password)
            alert("로그인이 성공하였습니다.");
            nav("/");
        } catch (error) {
            console.log(error);
            if (error.response) {
                alert(`로그인 실패: ${error.response.data.message}`);
            } else {
                alert("로그인 요청 중 오류가 발생했습니다.");
            }
        }
    };

    const handleIdChange = (e) =>{
        setId(e.target.value)
    }

    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
    }
    

    return (
        <Container className="mt-5">
            <Form onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">WWW</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control
                        type="text"
                        name='username'
                        placeholder="아이디를 입력해주세요."
                        value={id}
                        onChange={handleIdChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        name='password'
                        placeholder="비밀번호를 입력해주세요."
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    로그인
                </Button>

                <div className="text-center mt-3">
                    <Link>아이디 찾기</Link> | <Link>비밀번호 찾기</Link>
                </div>

                <hr />

                <Button variant="outline-success" className="w-100 mb-2">
                    네이버로 로그인
                </Button>
                <Button variant="outline-secondary" className="w-100 mb-2">
                    카카오로 로그인
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
