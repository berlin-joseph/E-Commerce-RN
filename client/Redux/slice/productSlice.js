import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../constants/url';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get(`${baseUrl}products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts: (state, action) => {
      // You can handle adding products here
    },
    updateProducts: (state, action) => {
      // You can handle updating products here
    },
    deleteProducts: (state, action) => {
      // You can handle deleting products here
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const {addProducts, updateProducts, deleteProducts} = productSlice.actions;

export default productSlice.reducer;
