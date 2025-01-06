<<<<<<< HEAD
// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './signupSlice';

const store = configureStore({
    reducer: {
        signup: signupReducer,
    },
});

export default store;
=======
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice.js';
import products from './slice/productsSlice';
import categories from './slice/categoriesSlice';

const store = configureStore({
      reducer: {
        auth: authSlice.reducer, // auth 상태를 관리하는 리듀서 추가
        products: products.reducer, // products
        categories: categories.reducer, // categories
      },
});

export default store;
>>>>>>> develop
