import React from "react";
import { Avatar, Box, Button, Link, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import orderApi from "../../../api/orderApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { currentFormat } from "../../../components/common/FormatCurrency";
import _ from "lodash";
import Noti from "../../../components/common/Toast";

const Product = ({ products, phone, orders }) => {
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const sumPrice = () =>
    _.sumBy(products.products, (e) => Number(e.price) * Number(e.prdCount));

  const statusProduct = [
    {
      text: "Đang giao hàng",
      Noti: "secondary",
      status: "danggiaohang",
    },
    {
      text: "Hoàn thành",
      Noti: "success",
      status: "hoanthanh",
    },
    {
      text: "Chờ xác nhận",
      Noti: "warning",
      status: "choxacnhan",
    },
    {
      text: "Đã hủy",
      Noti: "error",
      status: "dahuy",
    },
  ];

  useEffect(() => {
    statusProduct.map((e, i) => {
      if (products.status === e.status) {
        setStatus(statusProduct[i]);
      }
    });
  }, [products, statusProduct, loading]);
  console.log(orders);
  const handleDone = async (e) => {
    setLoading(true);
    try {
      // await orderApi.updateOrder({
      //   id: orders._id,
      //   cartId: orders.cart._id,
      //   status: "hoantat",
      // });
      Noti("success", "Đã xác nhận đơn hàng");
      setLoading(false);
    } catch (error) {
      Noti("error", error.message);
    }
  };

  return (
    <Box>
      <Paper sx={{ width: "max-content" }}>
        <Box sx={{ height: 250, overflow: "auto" }}>
          {products.products.map((data, i) => (
            <Box
              key={i}
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={2}
              p={3}
              m={1}
              width={300}
            >
              <Avatar
                src={data.image}
                alt={data.name}
                sx={{ width: 60, height: 60 }}
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

        <Box display="flex" flexDirection={"column"} p={3}>
          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Typography variant="h5" fontWeight="600">
              Tổng số tiền:
            </Typography>
            <Typography variant="h4" fontWeight={500} color="orange">
              {currentFormat(sumPrice())}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" flexDirection={"column"} gap={2}>
          {products.status === "danggiao" ? (
            <Box>
              <Button disabled variant="outlined" fullWidth>
                Đang giao hàng
              </Button>
              <Button
                onClick={handleDone}
                variant="contained"
                fullWidth
                sx={{ mt: 1 }}
              >
                Đã nhận được hàng
              </Button>
            </Box>
          ) : (
            <Button
              variant="outlined"
              fullWidth
              color={status?.Noti ?? "warning"}
              disableTouchRipple
            >
              {status?.text ?? "Chờ xác nhận"}
            </Button>
          )}
          <Button
            href={`tel:${phone}`}
            variant="outlined"
            fullWidth
            color="success"
          >
            Liên hệ với người mua
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

const DaMua = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const getOrders = async () => {
      const userOder = await orderApi.getOrderByUID({ id: user.id });
      setOrders(userOder);
    };
    getOrders();
  }, [user.id]);

  return orders.data?.length > 0 ? (
    <Box display="flex" flexDirection={"row"} gap={2} p={3} flexWrap={"wrap"}>
      {orders.data[0].cart.map((product, i) => (
        <Product
          products={product}
          phone={orders.data[0].phone}
          orders={orders.data[0]}
          key={i}
        />
      ))}
    </Box>
  ) : (
    <Typography variant="h4" align="center" sx={{ mt: 3 }}>
      Chưa có đơn hàng <Link href="/thuc-an-thuc-uong">Thêm ngay</Link>
    </Typography>
  );
};

export default DaMua;
