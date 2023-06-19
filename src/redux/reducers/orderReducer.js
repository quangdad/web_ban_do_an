import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const OrderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderReducer: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setOrderReducer } = OrderReducer.actions;
export default OrderReducer.reducer;
