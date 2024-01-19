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
  "product/fetchProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProducts = createAsyncThunk(
  "product/createProducts",
  async (
    { name, description, brand, price, category, featured },
    { rejectWithValue }
  ) => {
    try {
      const accessToken = localStorage.getItem("token");

      const response = await axios.post(`${baseUrl}products`, {
        name,
        description,
        brand,
        price,
        category,
        isFeatured: featured,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      console.error("Error response data:", error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    setSelectedProduct: (state, action) => {
      state.selectedProducts = action.payload;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
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
      .addCase(createProducts.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.products.push(action.payload);
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { addProduct, updateProduct, setSelectedProduct, deleteProduct } =
  productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export default productSlice.reducer;
