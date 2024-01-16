import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      name: "Product_2",
      description: "Product 2 description",
      richDescription: "Product 2 richDescription",
      brand: "Product 2 brand",
    },
    {
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
    updateProduct: (state, action) => {},
    deleteProduct: (state, action) => {},
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export default productSlice.reducer;
