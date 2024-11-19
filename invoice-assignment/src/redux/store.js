import { configureStore } from "@reduxjs/toolkit";
import invoicesReducer from "./slices/invoicesSlice";
import productsReducer from "./slices/productsSlice";
import customersReducer from "./slices/customerSlice";

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    products: productsReducer,
    customers: customersReducer,
  },
});
