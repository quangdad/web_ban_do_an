import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [],
};

export const ProducerReducer = createSlice({
  name: "producer",
  initialState,
  reducers: {
    setAllProducers: (state, action) => {
      state.all = action.payload;
    },
  },
});

export const { setAllProducers } = ProducerReducer.actions;
export default ProducerReducer.reducer;
