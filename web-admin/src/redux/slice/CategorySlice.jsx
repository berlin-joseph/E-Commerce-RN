import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../constants/url";

const initialState = {
  category: [],
  selectedCategory: null,
  loading: false,
  error: false,
};

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}category`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.category.push(action.payload);
    },
    updateCategory: (state, action) => {
      state.category = state.category.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    deleteCategory: (state, action) => {
      state.category = state.category.filter(
        (category) => category.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {} = categorySlice.actions;
export const selectAllCategory = (state) => state.category.category;
export default categorySlice.reducer;
