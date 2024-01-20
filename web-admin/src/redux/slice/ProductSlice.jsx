import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../constants/url";

const initialState = {
  products: [],
  selectedProducts: null,
  loading: false,
  error: false,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeProduct = createAsyncThunk(
  "product/removeProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${baseUrl}products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/removeProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${baseUrl}products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(removeProduct.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.products = Array.isArray(state.products)
          ? state.products.filter((product) => product.id !== action.payload.id)
          : [];
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {} = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export default productSlice.reducer;
