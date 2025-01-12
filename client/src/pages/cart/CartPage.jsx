import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    removeFromCart,
    clearCart,
    updateQuantity,
    fetchCartItemsAsync
} from '../../redux/slice/cartSlice';
import Header from "../../components/includes/Header";
import Footer from "../../components/includes/Footer";
import './CartPage.css';

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const loading = useSelector((state) => state.cart.loading);
    const error = useSelector((state) => state.cart.error);
    const { currentUser } = useSelector((state) => state.auth); // 사용자 정보 가져오기
    const dispatch = useDispatch();

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchCartItemsAsync(currentUser.user_no)); // 사용자 ID로 장바구니 데이터 가져오기
        }
    }, [currentUser, dispatch]);

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1) return;
        dispatch(updateQuantity({ index, quantity: newQuantity }));
    };

    const handleClearCart = () => {
        if (window.confirm("장바구니를 비우시겠습니까?")) {
            dispatch(clearCart());
            setSelectedItems([]);
        }
    };

    const handleCheckboxChange = (index) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter((item) => item !== index));
        } else {
            setSelectedItems([...selectedItems, index]);
        }
    };

    const totalAmount = selectedItems.reduce((sum, index) => {
        const item = cartItems[index];
        return sum + item.price * item.quantity;
    }, 0);

    const handlePayment = () => {
        const selectedProducts = selectedItems.map((index) => cartItems[index]);
        console.log("결제할 상품:", selectedProducts);
        alert("결제 페이지로 이동합니다.");
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Header />
            <div className="cart-container">
                <h1>장바구니</h1>
                {cartItems.length === 0 ? (
                    <p className="empty-cart">장바구니가 비어 있습니다.</p>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(index)}
                                        onChange={() => handleCheckboxChange(index)}
                                        className="item-checkbox"
                                    />
                                    <img src={item.img_url} alt={item.name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h2>{item.name}</h2>
                                        <p>사이즈: {item.selectedSize || "프리사이즈"}</p>
                                        <p>컬러: {item.selectedColor || "기본 컬러"}</p>
                                        <p>가격: {Number(item.price).toLocaleString()} 원</p>
                                    </div>
                                    <div className="cart-item-actions">
                                        <div className="quantity-control">
                                            <button onClick={() => handleQuantityChange(index, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                                        </div>
                                        <button onClick={() => dispatch(removeFromCart(index))} className="remove-button">삭제</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart-footer">
                            <p className="total-amount">총 금액: {Number(totalAmount).toLocaleString()} 원</p>
                            <div className="footer-actions">
                                <button onClick={handleClearCart} className="clear-cart-button">장바구니 비우기</button>
                                <button
                                    onClick={handlePayment}
                                    className="payment-button"
                                    disabled={selectedItems.length === 0}
                                >
                                    결제하기
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CartPage;
