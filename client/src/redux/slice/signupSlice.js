// src/redux/signupSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    id: '',
    password:'',
    address: '',
    birthDate: '',
    gender: '',
    phoneNumber: '',
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        updateName: (state, action) => {
            state.name = action.payload;
        },
        updateEmail: (state, action) => {
            state.email = action.payload;
        },
        updateId: (state, action) => {
            state.id = action.payload;
        },
        updatePassword: (state, action) => {
            state.password = action.payload;
        },
        updateAddress: (state, action) => {
            state.address = action.payload;
        },
        updateDetailAddress: (state, action) => {
            state.address = action.payload;
        },
        updateBirthDate: (state, action) => {
            state.birthDate = action.payload;
        },
        updateGender: (state, action) => {
            state.gender = action.payload;
        },
        updatePhoneNumber: (state, action) => {
            state.phoneNumber = action.payload;
        },
    }
});

export const {
    updateName,
    updateEmail,
    updateId,
    updatePassword ,
    updateAddress,
    updateDetailAddress,
    updateBirthDate,
    updateGender,
    updatePhoneNumber
} = signupSlice.actions;

export default signupSlice;
