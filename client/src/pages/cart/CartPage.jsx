import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    updateQuantity,
    fetchCartItemsAsync, DeleteAllCartItemAsync,
} from '../../redux/slice/cartSlice';
import Header from "../../components/includes/Header";
import Footer from "../../components/includes/Footer";
import CartItem from './CartItem'; // 분리된 컴포넌트
import './CartPage.css';
import {useNavigate} from "react-router-dom";


const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const loading = useSelector((state) => state.cart.loading);
    const error = useSelector((state) => state.cart.error);
    const navigate = useNavigate();
    const {currentUser} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchCartItemsAsync(currentUser.user_no));
        }
    }, [currentUser, dispatch]);

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1) return;
        dispatch(updateQuantity({index, quantity: newQuantity}));
    };
    const handleClearCart = () => {
        if (window.confirm("장바구니를 비우시겠습니까?")) {
            dispatch(DeleteAllCartItemAsync(cartItems[0].cart_no));
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
        return item? sum + item.price * item.quantity : sum;
    }, 0);

    const handlePayment = () => {
        const selectedProducts = selectedItems.map((index) => cartItems[index]);
        navigate('/widget/checkout', {
            state: {
                selectedProducts, //선택한 상품 정보
                totalAmount, //총 금액
                currentUser // 현재 로그인한 사용자 정보
            }
        });
        alert("결제 페이지로 이동합니다.")
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Header/>
            <div className="cart-container" style={{marginTop :'100px'}}>
                <h1>장바구니</h1>
                {cartItems.length === 0 ? (
                    <p className="empty-cart">장바구니가 비어 있습니다.</p>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item, index) => (
                                <CartItem
                                    key={item.cart_item_no}
                                    item={item}
                                    index={index}
                                    selectedItems={selectedItems}
                                    onCheckboxChange={handleCheckboxChange}
                                    onQuantityChange={handleQuantityChange}
                                />
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
            <Footer/>
        </>
    );
};

export default CartPage;
