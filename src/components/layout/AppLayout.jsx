import { Box, Toolbar } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import productApi from "../../api/productApi";
import userApi from "../../api/userApi";
import { setProducts } from "../../redux/reducers/productReducer";
import { setUser } from "../../redux/reducers/userReducer";
import Navbar from "../common/Navbar";
import Footer from "../Footer";
import AboutProductModal from "../modals/AboutProductModal";
import CartModal from "../modals/CartModal";
import InforUserPay from "../modals/InforUserPay";
import PayModal from "../modals/PayModal";
import SigninModal from "../modals/SigninModal";
import SignupModal from "../modals/SignupModal";

const AppLayout = () => {
  const dispatch = useDispatch();
  const UID = localStorage.getItem("UID");

  useEffect(() => {
    const getProducts = async () => {
      const products = await productApi.getAllProducts();
      dispatch(setProducts(products));
    };
    const getUser = async () => {
      const user = await userApi.getUser(UID);
      dispatch(setUser(user));
    };
    getProducts();
    getUser();
  }, [dispatch, UID]);

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Navbar />
      <Box flexGrow={1}>
        <Toolbar />
        <Outlet />
        <CartModal />
        <SigninModal />
        <SignupModal />
        <InforUserPay />
        <AboutProductModal />
        <PayModal />
      </Box>
      <Footer />
    </Box>
  );
};

export default AppLayout;
