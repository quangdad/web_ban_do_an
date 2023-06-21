import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { currentFormat } from "../../../components/common/FormatCurrency";
import _ from "lodash";
import orderApi from "../../../api/orderApi";
import { LoadingButton } from "@mui/lab";
import Noti from "../../../components/common/Toast";
import { useEffect } from "react";
import userApi from "../../../api/userApi";

const Product = ({ products, loading, setLoading }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userOrder, setuserOrder] = useState(null);
  const [getUserLoading, setGetUserLoading] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setGetUserLoading(true);
        const data = await userApi.getUser(products.UID);
        setuserOrder(data);
      } catch (error) {
        throw error;
      } finally {
        setGetUserLoading(false);
      }
    };
    getUserInfo();
  }, [products.UID]);

  const sumPrice = () =>
    _.sumBy(products.products, (e) => Number(e.price) * Number(e.prdCount));

  const handleAccept = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsLoading(true);
    try {
      await orderApi.updateOrder({
        id: products.prdID,
        cartId: products._id,
        status: "danggiao",
      });
      Noti("success", "Đã xác nhận đơn hàng");
    } catch (error) {
      Noti("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    setIsLoading(true);
    setLoading(true);
    try {
      await orderApi.updateOrder({
        id: products.prdID,
        cartId: products._id,
        status: "dahuy",
      });
      Noti("success", "Đã hủy đơn hàng");
    } catch (error) {
      Noti("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Paper
        sx={{
          width: "max-content",
          p: 2,
          border: `1px solid ${products.status === "dahuy" ? "red" : "black"}`,
        }}
      >
        {getUserLoading ? (
          <CircularProgress />
        ) : (
          <Box>
            <Typography>
              Fullname:{" "}
              <b>
                <i>{userOrder?.fullname}</i>
              </b>{" "}
            </Typography>
            <Typography>
              Phone:{" "}
              <b>
                <i>{userOrder?.phone}</i>
              </b>{" "}
            </Typography>
            <Typography>
              Address:{" "}
              <b>
                <i>{userOrder?.address}</i>
              </b>{" "}
            </Typography>
            <hr />
          </Box>
        )}
        <Box
          sx={{
            height: 220,
            overflow: "auto",
          }}
        >
          {products.products.map((data, i) => (
            <Box
              key={i}
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={2}
              p={1}
              m={1}
              width={300}
            >
              <Avatar
                src={data.image}
                alt={data.name}
                sx={{ width: 80, height: 80 }}
              />
              <Box display="flex" flexDirection={"column"}>
                <Typography variant="h6" fontWeight={500}>
                  {data.name}
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent={"space-between"}
                  gap={4}
                >
                  <Typography variant="h6">{data.prdCount}</Typography>
                  <Typography variant="h6" color="orange" align="right">
                    {currentFormat(data.price)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Box display="flex" flexDirection={"column"}>
          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Typography variant="h5" fontWeight="600">
              Tổng số tiền
            </Typography>
            <Typography variant="h4" fontWeight={500} color="orange">
              {currentFormat(sumPrice())}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection={"column"} gap={2}>
          {products.status === "danggiao" ? (
            <Button disabled variant="contained" fullWidth color="success">
              Chờ lấy hàng
            </Button>
          ) : (
            <LoadingButton
              variant="contained"
              fullWidth
              color="success"
              loading={isLoading}
              onClick={handleAccept}
              disabled={products.status === "dahuy"}
            >
              Xác nhận đơn hàng
            </LoadingButton>
          )}
          {products.status !== "danggiao" && (
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={handleCancel}
              disabled={products.status === "dahuy"}
            >
              {products.status === "dahuy" ? "Đã hủy đơn hàng" : "Hủy đơn hàng"}
            </Button>
          )}
          <Button
            href={`tel:${products.phone}`}
            variant="outlined"
            fullWidth
            color="secondary"
          >
            Liên hệ với người mua
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Product;
