import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice';
import categoriesSlice from "./slice/categoriesSlice";
import productsSlice from "./slice/productsSlice";


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        products: productsSlice.reducer,
        categories: categoriesSlice.reducer
    },
});


export default store;