import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setPayModal } from "../../redux/reducers/modalReducer";
import { Button, IconButton, Paper, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import _ from "lodash";
import { currentFormat } from "../common/FormatCurrency";
import { useState } from "react";
import Noti from "../../components/common/Toast";
import { setAddCart } from "../../redux/reducers/productReducer";
import { useNavigate } from "react-router-dom";
import orderApi from "../../api/orderApi";
import { LoadingButton } from "@mui/lab";
import voucherApi from "../../api/voucher";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  minWidth: "400px",
  borderRadius: "10px",
  p: 4,
};

export default function PayModal() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.pay);
  const user = useSelector((state) => state.user.data);
  const [addressErrText, setAddressErrText] = useState(null);
  const [voucher, setVoucher] = useState("");
  const [sales, setSales] = useState(0);
  const [voucherErrText, setVoucherErrText] = useState("");

  const navigate = useNavigate();
  const products = useSelector((state) => state.products.addCart);

  const handleClose = () => {
    dispatch(setPayModal(false));
    setSales(0);
    setVoucher(0);
    setVoucherErrText("");
  };

  const handleAddVoucher = async () => {
    if (voucher === "") {
      setVoucherErrText("Bạn chưa nhập voucher");
      return;
    }
    setVoucherErrText("");
    setLoading(true);
    try {
      const data = await voucherApi.get({ voucher });
      setSales(data.sales);
      setLoading(false);
    } catch (e) {
      setVoucherErrText("Voucher không hợp lệ");
      setLoading(false);
    }
  };

  const handlePay = async () => {
    setLoading(true);
    if (!user.address) {
      setAddressErrText("Vui lòng thêm địa chỉ nhận hàng");
      setLoading(false);
      return;
    }
    try {
      await orderApi.createOrder({
        cart: {
          products,
          voucher: "",
        },
        UID: user._id,
        nameOfUser: user.fullname,
        phone: +user.phone,
        address: user.address,
      });

      setLoading(false);
      dispatch(setPayModal(false));
      Noti("success", "Đặt hàng thành công");
      dispatch(setAddCart([]));
    } catch (error) {
      Noti("error", error.data);
      setLoading(false);
    }
  };

  const CartItem = ({ product }) => {
    const [productCount, setProductCount] = useState(product.prdCount);
    const handleRemove = () => {
      let count = product.prdCount;
      count = count - 1;
      product = {
        ...product,
        prdCount: count <= 0 ? 0 : count,
      };

      setProductCount(productCount - 1);

      // don't yet
      if (product.prdCount === 0) {
        _.remove(products, (e) => e.id === product.id);
      }
    };

    const handleAdd = () => {
      product = {
        ...product,
        prdCount: product.prdCount + 1,
      };
      setProductCount(productCount + 1);
    };

    return (
      <Paper
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          p: 2,
        }}
      >
        <img
          style={{ width: "60px", height: "50px" }}
          src={product.image}
          alt={product.name}
        />
        <Box display={"flex"} flexDirection="column" justifyContent={"start"}>
          <Typography fontWeight={600} variant="h5">
            {product.name}
          </Typography>
          <Typography
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow="hidden"
            width={"400px"}
            sx={{ textOverflow: "ellipsis" }}
          >
            {product.description}
          </Typography>
          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent={"space-around"}
            alignItems="center"
          >
            <Box display={"flex"} flexDirection="row" alignItems={"center"}>
              <IconButton onClick={handleRemove}>
                <RemoveIcon />
              </IconButton>
              <Typography>{productCount}</Typography>
              <IconButton onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            </Box>
            <Typography variant="h5" color="orange">
              {currentFormat(productCount * product.price)}
            </Typography>
          </Box>
        </Box>
        <Box></Box>
      </Paper>
    );
  };

  const handleEditAddress = () => {
    navigate("/profile");
    dispatch(setPayModal(false));
    setLoading(false);
  };

  const sumPrice = () => _.sumBy(products, (e) => e.price * e.prdCount);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align="center" fontWeight={600} variant="h4">
            Thanh toán
          </Typography>
          {products.length > 0 ? (
            <Box
              display={"flex"}
              maxHeight={500}
              overflow="auto"
              flexDirection="column"
              gap={2}
              pt={3}
            >
              {products.map((product, i) => (
                <CartItem key={i} product={product} />
              ))}
            </Box>
          ) : (
            <Typography align="center" pt={2}>
              Chưa có sản phẩm
            </Typography>
          )}

          <Box pt={3}>
            <Box
              display="flex"
              flexDirection={"row"}
              justifyContent="space-between"
              gap={4}
            >
              <TextField
                onChange={(e) => setVoucher(e.target.value)}
                label="Nhập mã giảm giá"
                fullWidth
                error={voucherErrText !== ""}
                helperText={voucherErrText}
              />
              <LoadingButton
                loading={loading}
                variant="contained"
                fullWidth
                onClick={handleAddVoucher}
              >
                Áp dụng
              </LoadingButton>
            </Box>
            {sales > 0 && (
              <Box>
                <Typography color={"orange"}>Bạn được giảm {sales}%</Typography>
              </Box>
            )}
            <Box display="flex" flexDirection={"row"} gap={2}>
              <TextField
                defaultValue={user.address}
                fullWidth
                error={addressErrText}
                helperText={addressErrText}
                disabled
                label="Địa chỉ"
                margin="normal"
              />
              <Button
                // variant="outlined"
                size="small"
                sx={{ width: "30%" }}
                onClick={handleEditAddress}
              >
                Chỉnh sửa
              </Button>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent={"space-between"}
            p={4}
            alignItems="center"
          >
            <Typography fontWeight={600} variant="h4">
              Tổng thanh toán
            </Typography>
            <Typography variant="h4" color="orange">
              {currentFormat(sumPrice() - (sumPrice() * sales) / 100)}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent={"center"}
            pt={4}
            gap={4}
          >
            <Button
              fullWidth
              color="warning"
              variant="contained"
              onClick={handleClose}
            >
              Mua thêm
            </Button>
            {products.length > 0 && (
              <LoadingButton
                color="success"
                variant="contained"
                fullWidth
                onClick={handlePay}
                loading={loading}
              >
                Thanh toán
              </LoadingButton>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
