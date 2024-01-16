import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      name: "Product_2",
      description: "Product 2 description",
      richDescription: "Product 2 richDescription",
      brand: "Product 2 brand",
    },
    {
      id: 2,
      name: "Product_1",
      description: "Product 1 description",
      richDescription: "Product 1 richDescription",
      brand: "Product 1 brand",
    },
  ],
  selectedProducts: {},
  loading: false,
  error: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((products) =>
        products.id === action.payload ? action.payload : task
      );
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { addProduct, updateProduct, setSelectedProducts, deleteProduct } =
  productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export default productSlice.reducer;
