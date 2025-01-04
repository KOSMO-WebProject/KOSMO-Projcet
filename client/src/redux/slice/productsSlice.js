import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 비동기 작업: 제품 데이터를 가져오기
export const setProducts = createAsyncThunk('shop/setProducts', async () => {
    // 임시 제품 데이터
    const products = [
        { id: 1, title: "여성 패션 아이템", description: "스타일리시한 여성 룩", category: 'Women' },
        { id: 2, title: "여성 패션 아이템", description: "모던한 여성 스타일", category: 'Women' },
        { id: 3, title: "여성 패션 아이템", description: "스타일리시한 여성 룩", category: 'Women' },
        { id: 4, title: "여성 패션 아이템", description: "모던한 여성 스타일", category: 'Women' },
        { id: 5, title: "남성 패션 아이템", description: "세련된 남성 스타일", category: 'Men' },
        { id: 6, title: "남성 패션 아이템", description: "캐주얼한 남성 스타일", category: 'Men' },
        { id: 7, title: "남성 패션 아이템", description: "세련된 남성 스타일", category: 'Men' },
        { id: 8, title: "남성 패션 아이템", description: "캐주얼한 남성 스타일", category: 'Men' },
    ];

    return products;
});


// 비동기 작업: 카테고리 데이터를 가져오기
export const setCategories = createAsyncThunk('shop/setCategories', async () => {
    const response = await fetch('/api/categories'); // 실제 API 엔드포인트로 변경
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json();
});

// 초기 상태
const initialState = {
    products: [],
    categories: [],
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
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(setProducts.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })

            // 카테고리 데이터 처리
            .addCase(setCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(setCategories.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default productsSlice;