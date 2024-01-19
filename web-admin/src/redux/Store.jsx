import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slice/ProductSlice";
import authSlice from "./slice/authSlice";
import CategorySlice from "./slice/CategorySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: ProductSlice,
    category: CategorySlice,
  },
});
