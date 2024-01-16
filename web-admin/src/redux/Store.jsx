import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slice/ProductSlice";

export const store = configureStore({
  reducer: {
    product: ProductSlice,
  },
});
