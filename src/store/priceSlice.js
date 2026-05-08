import { createSlice } from "@reduxjs/toolkit";


const priceSlice = createSlice({
  name: "price",
  initialState: {
    multiplier: 1,
  },
  reducers: {
    adjustPrice: (state, action) => {
      const delta = action.payload;
      state.multiplier =
        Math.round(state.multiplier * (1 + delta / 100) * 1000) / 1000;
    },
    resetPrice: (state) => {
      state.multiplier = 1;
    },
  },
});

export const { adjustPrice, resetPrice } = priceSlice.actions;
export default priceSlice.reducer;