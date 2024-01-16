import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../constants/url";
const initialState = {
  category: [
    { id: 1, name: "hi", image: "hi" },
    { id: 2, name: "hi", image: "hi" },
  ],
  selectedCategory: null,
  loading: false,
  error: false,
};

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async ({ name, image }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}category`, { name, image });
      return response.data;
    } catch (error) {}
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
});

export const {
  addCategory,
  updateCategory,
  setSelectedCategory,
  selectedCategory,
} = categorySlice.actions;
export const selectAllCategory = (state) => state.category.category;
export default categorySlice.reducer;
