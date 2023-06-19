import React, { useState } from "react";
import { Box } from "@mui/material";
import { useEffect } from "react";
import orderApi from "../../../api/orderApi";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingR } from "../../../redux/reducers/loadingReducer";
import { setOrderReducer } from "../../../redux/reducers/orderReducer";
import Product from "./Product";

const Order = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const products = useSelector((state) => state.order.data);
  useEffect(() => {
    dispatch(setLoadingR(true));
    const getOrders = async () => {
      const userOrder = await orderApi.getOrders();
      console.log(userOrder);
      _.map(userOrder, "cart").map((e) =>
        dispatch(
          setOrderReducer(
            e.map(
              (v) =>
                (v = {
                  ...v,
                  UID: _.find(userOrder, e.id).UID,
                  prdID: _.find(userOrder, e.id)._id,
                  phone: _.find(userOrder, e.id).phone,
                })
            )
          )
        )
      );
    };
    dispatch(setLoadingR(false));
    dispatch(setOrderReducer(products));
    getOrders();
  }, [dispatch, loading]);

  return (
    products && (
      <Box display="flex" flexDirection={"row"} gap={2} p={3} flexWrap="wrap">
        {products?.map((product, i) => (
          <Product
            products={product}
            key={i}
            loading={loading}
            setLoading={setLoading}
          />
        ))}
      </Box>
    )
  );
};

export default Order;
