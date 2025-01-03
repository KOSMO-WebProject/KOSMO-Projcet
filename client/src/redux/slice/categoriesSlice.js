import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch categories asynchronously
export const setCategories = createAsyncThunk("categories/setCategories", async () => {
  // 임시 카테고리 데이터
  const categories = ['Women', 'Men'];
  return categories;
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(setCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice;