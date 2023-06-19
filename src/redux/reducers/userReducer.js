import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUser } = userReducer.actions;
export default userReducer.reducer;
