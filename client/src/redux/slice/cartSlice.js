// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = []; // 초기 상태

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            state.push(item); // 장바구니에 아이템 추가
        },
        removeFromCart: (state, action) => {
            return state.filter((_, index) => index !== action.payload); // 아이템 삭제
        },
        clearCart: () => {
            return []; // 장바구니 비우기
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions; // clearCart 내보내기
export default cartSlice;