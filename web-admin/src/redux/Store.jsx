import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slice/ProductSlice";
import authSlice from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: ProductSlice,
  },
});
