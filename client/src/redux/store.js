import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice';
import categoriesSlice from "./slice/categoriesSlice";
import productsSlice from "./slice/productsSlice";
import cartSlice from "./slice/cartSlice";
import weatherReducer from './slice/weatherSlice'; 
import signupReducer from './slice/signupSlice';
import homepageReducer from './slice/homepageSlice';


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        products: productsSlice.reducer,
        categories: categoriesSlice.reducer,
        cart: cartSlice.reducer,
        weather: weatherReducer.reducer, 
        signup: signupReducer.reducer,
        homepage: homepageReducer.reducer
    
    },
});


export default store;