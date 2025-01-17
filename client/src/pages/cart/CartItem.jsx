import React from 'react';
import {useDispatch} from "react-redux";
import {DeleteCartItemAsync} from "../../redux/slice/cartSlice";

const CartItem = ({
                      item,
                      index,
                      selectedItems,
                      onCheckboxChange,
                      onQuantityChange,
                  }) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        if (window.confirm('이 상품을 장바구니에서 삭제하시겠습니까?')) {
            dispatch(DeleteCartItemAsync(item.cart_item_no));
        }
    };
    return (
        <div key={index} className="cart-item">
            <input
                type="checkbox"
                checked={selectedItems.includes(index)}
                onChange={() => onCheckboxChange(index)}
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
            <div class="quantity-control-container">
                <div className="quantity-control">
                    <button onClick={() => onQuantityChange(index, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onQuantityChange(index, item.quantity + 1)}>+</button>
                </div>
                <button onClick={handleDelete} className="remove-button">
                    삭제
                </button>
            </div>
        </div>
        </div>
    );
};

export default CartItem;