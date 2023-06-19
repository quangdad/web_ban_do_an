import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
};

export const loadingReducer = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingR: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setLoadingR } = loadingReducer.actions;
export default loadingReducer.reducer;
