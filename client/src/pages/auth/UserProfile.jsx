import { Card, Button, ListGroup, Container, Row, Col } from "react-bootstrap";
import Header from "../../components/includes/Header";
import Footer from "../../components/includes/Footer";
import { useSelector } from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import * as orders from "react-bootstrap/ElementChildren";

const UserProfile = () => {
    const { currentUser } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const response = await axios.get("/orders/" + currentUser.user_no);
                setOrders(response.data)
            }
            catch (error){
                console.error(error)
        }
    }
        fetchOrders();
    }, [orders,currentUser]);


    return (
        <>
            <Header />
            <Container style={{ marginTop: "20px" }}>
                {currentUser ? (
                    <>
                        {/* User Info Section */}
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>안녕하세요, {currentUser.nick_name}님!</Card.Title>
                                <Card.Text>
                                    <strong>이름 :</strong> {currentUser.user_name}
                                    <br />
                                    <strong>Email:</strong> {currentUser.email}
                                    <br />
                                    <strong>Phone:</strong> {currentUser.phone_number}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <h4>구매 내역</h4>
                        {orders.length > 0 ? (
                            <ListGroup>
                                {orders.map((order) => (
                                    <ListGroup.Item key={order.order_no} className="mb-3">
                                        <h5>주문 번호: {order.order_no}</h5>
                                        <p>
                                            <strong>주문일자:</strong> {order.order_date}
                                            <br />
                                            <strong>총 금액:</strong> {Number(order.total_amount).toLocaleString()}원
                                            <br />
                                            <strong>상태:</strong> {order.payment_status}
                                        </p>
                                        {/* Product List */}
                                        <ListGroup variant="flush">
                                            {order.products.map((product) => (
                                                <ListGroup.Item key={product.product_no} className="d-flex align-items-center">
                                                    <img
                                                        src={product.img_url}
                                                        alt={product.name}
                                                        style={{ width: "80px", height: "80px", marginRight: "10px" }}
                                                    />
                                                    <div>
                                                        <h6>{product.name}</h6>
                                                        <p>
                                                            <strong>수량:</strong> {product.quantity}
                                                            <br />
                                                            <strong>가격:</strong> {Number(product.price).toLocaleString()}원
                                                        </p>
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                        <div className="mt-3">
                                            <Button variant="primary" size="sm" className="me-2">
                                                배송 조회
                                            </Button>
                                            <Button variant="outline-primary" size="sm" className="me-2">
                                                후기 작성
                                            </Button>
                                            <Button variant="outline-warning" size="sm" className="me-2">
                                                교환/반품
                                            </Button>
                                            <Button variant="outline-danger" size="sm" className="me-2">
                                                주문취소
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>구매 내역이 없습니다.</p>
                        )}
                    </>
                ) : (
                    <div className="alert alert-warning" role="alert">
                        회원가입이 또는 로그인이 필요합니다.
                    </div>
                )}
            </Container>
            <Footer />
        </>
    );
};

export default UserProfile;

