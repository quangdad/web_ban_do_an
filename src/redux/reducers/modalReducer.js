import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signin: false,
  signup: false,
  cart: false,
  userAdmin: {
    status: false,
    data: {},
  },
  addUser: false,

  product: false,
  editProduct: {
    status: false,
    data: {},
  },
  showProductModal: {
    status: false,
    data: {},
  },

  producer: false,
  editProducer: {
    status: false,
    data: {},
  },

  pay: false,
  inforPay: false,
};

export const modalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setAddProductModal: (state, action) => {
      state.product = action.payload;
    },
    setShowProdctModal: (state, action) => {
      state.showProductModal = action.payload;
    },

    setSigninModal: (state, action) => {
      state.signin = action.payload;
    },
    setSignupModal: (state, action) => {
      state.signup = action.payload;
    },
    setCartModal: (state, action) => {
      state.cart = action.payload;
    },
    setUserAdminModal: (state, action) => {
      state.userAdmin = action.payload;
    },
    setAddUserModal: (state, action) => {
      state.addUser = action.payload;
    },

    setEditProductModal: (state, action) => {
      state.editProduct = action.payload;
    },
    setAddProducerModal: (state, action) => {
      state.producer = action.payload;
    },
    setEditProducerModal: (state, action) => {
      state.editProducer = action.payload;
    },
    setPayModal: (state, action) => {
      state.pay = action.payload;
    },
    setInforPay: (state, action) => {
      state.inforPay = action.payload;
    },
  },
});

export const {
  setAddProductModal,
  setCartModal,
  setSigninModal,
  setSignupModal,
  setUserAdminModal,
  setAddUserModal,

  setEditProductModal,
  setShowProdctModal,

  setAddProducerModal,
  setEditProducerModal,
  setInforPay,
  setPayModal,
} = modalReducer.actions;
export default modalReducer.reducer;
