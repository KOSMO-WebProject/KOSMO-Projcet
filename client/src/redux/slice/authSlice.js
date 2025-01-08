import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 비동기 로그인 액션
export const login = createAsyncThunk(
  "auth/login",
  async ({ user_id, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/auth/login",
        { user_id, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "로그인 실패");
    }
  }
);

// 비동기 로그아웃 액션
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      return null; // 로그아웃 성공 시 유저 상태를 null로 설정
    } catch (error) {
      return rejectWithValue(error.response.data || "로그아웃 실패");
    }
  }
);

// 비동기 로그인 상태 유지 액션
export const loadUser = createAsyncThunk(
"auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/accesstoken", {
        withCredentials: true,
      });
      return response.data; // 사용자 정보 반환
    } catch (error) {
      return rejectWithValue(error.response.data || "사용자 정보 로드 실패");
    }
  }
);

// Slice 정의
const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 로그인
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 로그아웃
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      })
      // 사용자 상태 로드
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice;
