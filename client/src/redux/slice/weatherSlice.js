import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 날씨 정보를 가져오는 비동기 함수
export const fetchWeather = createAsyncThunk('weather/fetchWeather', async () => {
  const apiKey = 'YOUR_KAKAO_API_KEY';
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&appid=${apiKey}`
  );
  return response.data;
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weatherData = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice;
