import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 초기 상태
const initialState = {
    items: [],
    loading: false,
    error: null,
};

//장바구니 상품 추가
export const addToCartAsync = createAsyncThunk(
    'cart/addToCartAsync',
    async (cartItem, { rejectWithValue }) => {
        try {
            const response = await axios.post('/carts/item', cartItem);
            console.log('Response from server:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding to cart:', error);
            return rejectWithValue(error.response?.data || '장바구니 추가 실패');
        }
    }
);

//장바구니 조회
export const fetchCartItemsAsync = createAsyncThunk(
    'cart/fetchCartItemsAsync',
    async (user_no, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/carts/item/${user_no}`);
            console.log('Fetched Cart Items:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching cart items:', error);
            return rejectWithValue(error.response?.data || '장바구니 조회 실패');
        }
    }
);

// Slice 생성
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeFromCart: (state, action) => {
            state.items = state.items.filter((_, index) => index !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { index, quantity } = action.payload;
            if (state.items[index]) {
                state.items[index].quantity = quantity > 0 ? quantity : 1;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            //장바구니 추가
            .addCase(addToCartAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                const item = action.payload;
                const existingItem = state.items.find(
                    (cartItem) =>
                        cartItem.product_no === item.product_no &&
                        cartItem.selectedSize === item.selectedSize &&
                        cartItem.selectedColor === item.selectedColor
                );
                if (existingItem) {
                    existingItem.quantity += item.quantity;
                } else {
                    state.items.push(item);
                }
                state.loading = false;
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.error = action.payload || '장바구니 추가 중 오류 발생';
                state.loading = false;
            })
            //장바구니 조회
            .addCase(fetchCartItemsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
                state.items = action.payload; // 서버에서 받아온 장바구니 데이터로 업데이트
                state.loading = false;
            })
            .addCase(fetchCartItemsAsync.rejected, (state, action) => {
                state.error = action.payload || '장바구니 조회 중 오류 발생';
                state.loading = false;
            });
        //장바구니 삭제
    },
});

export const { removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice;