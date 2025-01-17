// src/redux/slice/sizeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sizeSlice = createSlice({
  name: 'size',
  initialState: {
    sizes: [], // 초기 사이즈 데이터
  },
  reducers: {
    addSize: (state, action) => {
      state.sizes.push(action.payload); // 새로운 사이즈 추가
    },
  },
});

export const { addSize } = sizeSlice.actions; // 액션 내보내기
export const selectSizes = (state) => state.size.sizes; // 사이즈 선택 셀렉터
export default sizeSlice;





/* // sizeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sizes: [
    { name: 'FREE', 총장: 52, 어깨너비: 47, 가슴단면: 60, 소매길이: 60 },
    { name: 'Silver', 총장: 52, 어깨너비: 47, 가슴단면: 60, 소매길이: 60 },
    { name: 'Black', 총장: 52, 어깨너비: 47, 가슴단면: 60, 소매길이: 60 },
    { name: 'Sky Blue', 총장: 52, 어깨너비: 47, 가슴단면: 60, 소매길이: 60 },
    { name: 'Pearl', 총장: 52, 어깨너비: 47, 가슴단면: 60, 소매길이: 60 },
  ],
};

const sizeSlice = createSlice({
  name: 'size',
  initialState,
  reducers: {},
});

export const selectSizes = (state) => state.size.sizes;
export default sizeSlice; */
