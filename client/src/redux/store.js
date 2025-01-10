import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice';
import categoriesSlice from "./slice/categoriesSlice";
import productsSlice from "./slice/productsSlice";
import cartSlice from "./slice/cartSlice";


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        products: productsSlice.reducer,
        categories: categoriesSlice.reducer,
        cart: cartSlice.reducer,
    },
});


export default store;