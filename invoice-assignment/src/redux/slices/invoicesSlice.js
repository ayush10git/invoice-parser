import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addInvoice } = invoicesSlice.actions;
export default invoicesSlice.reducer;
