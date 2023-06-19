import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  addCart: [],
};

export const ProductReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
    setAddCart: (state, action) => {
      state.addCart = action.payload;
    },
  },
});

export const { setProducts, setAddCart } = ProductReducer.actions;
export default ProductReducer.reducer;
