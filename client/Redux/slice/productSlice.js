import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../constants/url';

const initialState = {
  products: [],
  filteredProducts: [],
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
    addProducts: (state, action) => {},
    updateProducts: (state, action) => {},
    deleteProducts: (state, action) => {},
    filterProducts: (state, action) => {
      const {searchQuery} = action.payload;
      if (searchQuery) {
        // Filter products based on the search query
        state.filteredProducts = state.products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      } else {
        // If search query is empty, reset filteredProducts to all products
        state.filteredProducts = state.products;
      }
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

export const {addProducts, updateProducts, deleteProducts, filterProducts} =
  productSlice.actions;


export default productSlice.reducer;
