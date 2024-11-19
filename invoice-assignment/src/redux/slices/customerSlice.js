import { createSlice } from "@reduxjs/toolkit";

const customersSlice = createSlice({
  name: "customers",
  initialState: [],
  reducers: {
    addCustomer: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addCustomer } = customersSlice.actions;
export default customersSlice.reducer;
