import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./reducers/loadingReducer";
import modalReducer from "./reducers/modalReducer";
import orderReducer from "./reducers/orderReducer";
import producerReducer from "./reducers/producerReducer";
import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";
import voucherReducer from "./reducers/voucherReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    loading: loadingReducer,
    products: productReducer,
    producer: producerReducer,
    order: orderReducer,
    voucher: voucherReducer,
  },
});

export default store;
