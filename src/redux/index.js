import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/slices/productSlice";
import logReducer from "../redux/slices/logSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    logs: logReducer,
  },
});
