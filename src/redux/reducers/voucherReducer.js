import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
};

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    setAddVoucherModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { setAddVoucherModal } = voucherSlice.actions;
export default voucherSlice.reducer;
