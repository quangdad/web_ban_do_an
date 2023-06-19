import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import orderApi from "../../../api/orderApi";
import { useDispatch, useSelector } from "react-redux";
import { setOrderReducer } from "../../../redux/reducers/orderReducer";
import Product from "./Product";

const Order = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productsCart, setProductsCart] = useState([]);
  const [status, setStatus] = useState("choxacnhan");
  const products = useSelector((state) => state.order.data);

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      const userOrder = await orderApi.getOrders();
      const productsCart = userOrder.flatMap((order) => order.cart);
      console.log(userOrder);
      setProductsCart(productsCart);
      // dispatch(
      //   setOrderReducer(
      //     e.map(
      //       (v) =>
      //         (v = {
      //           ...v,
      //           UID: _.find(userOrder, e.id).UID,
      //           prdID: _.find(userOrder, e.id)._id,
      //           phone: _.find(userOrder, e.id).phone,
      //         })
      //     )
      //   )
      // )
    };
    dispatch(setOrderReducer(products));

    getOrders();
    setIsLoading(false);
  }, [dispatch, loading]);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Box>
      <FormControl sx={{ width: 160, right: 0, m: 3, position: "absolute" }}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={"danggiao"}>Đang giao</MenuItem>
          <MenuItem value={"hoantat"}>Hoàn tất</MenuItem>
          <MenuItem value={"dahuy"}>Đã hủy</MenuItem>
          <MenuItem value={"choxacnhan"}>Chờ xác nhận</MenuItem>
        </Select>
      </FormControl>
      {productsCart && (
        <Box display="flex" flexDirection={"row"} gap={2} p={3} flexWrap="wrap">
          {productsCart
            .filter((p) => p.status === status)
            .map((product, i) => (
              <Product
                products={product}
                key={i}
                loading={loading}
                setLoading={setLoading}
              />
            ))}
        </Box>
      )}
    </Box>
  );
};

export default Order;
