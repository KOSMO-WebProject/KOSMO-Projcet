import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [
    "https://image.msscdn.net/thumbnails/images/goods_img/20241028/4562794/4562794_17300782062367_500.jpg?w=780",
    "https://image.msscdn.net/thumbnails/images/goods_img/20241210/4658692/4658692_17340550225044_500.jpg?w=780",
    "https://image.msscdn.net/thumbnails/images/goods_img/20240823/4364845/4364845_17243857406337_500.jpg?w=780"
  ],
  currentImageIndex: 0
};

const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    nextImage: (state) => {
      state.currentImageIndex = (state.currentImageIndex + 1) % state.images.length;
    },
    prevImage: (state) => {
      state.currentImageIndex = (state.currentImageIndex - 1 + state.images.length) % state.images.length;
    }
  }
});

export const { nextImage, prevImage } = homepageSlice.actions;
export default homepageSlice;
