import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../constants/url';

const initialState = {
  category: [],
  status: 'idle',
  error: null,
};

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async () => {
    try {
      const response = await axios.get(`${baseUrl}category`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    createCategory: (state, action) => {},
    updateCategory: (state, action) => {},
    deleteCategory: state => {},
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategory.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload; // Fix the key here
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {createCategory, updateCategory, deleteCategory} =
  categorySlice.actions;

export default categorySlice.reducer;
