// redux/slice/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// 비동기 작업: 제품 데이터를 가져오기
export const setProducts = createAsyncThunk('/products', async (category_no) => {
    try {
        const response = await axios.get(`/products/${category_no}`);
        return { category_no, products: response.data };
    }
    catch (error) {
        console.log(error)
        return error.message;
    }
});

// 초기 상태
const initialState = {
    products: [],
    loading: false,
    error: null,
};

// 슬라이스 생성
const productsSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 제품 데이터 처리
            .addCase(setProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setProducts.fulfilled, (state, action) => {
                const { category_no, products } = action.payload;
                state.products[category_no] = products;
                state.loading = false;
            })
            .addCase(setProducts.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default productsSlice;