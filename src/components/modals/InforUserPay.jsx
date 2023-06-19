import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setInforPay, setSigninModal } from "../../redux/reducers/modalReducer";
import {
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import _ from "lodash";
import { currentFormat } from "../common/FormatCurrency";
import { useState } from "react";
import Noti from "../../components/common/Toast";
import { setAddCart } from "../../redux/reducers/productReducer";

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

export default function InforUserPay() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.inforPay);
  const user = useSelector((state) => state.user.data);

  const products = useSelector((state) => state.products.addCart);

  const handleClose = () => {
    dispatch(setInforPay(false));
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

  const sumPrice = () => _.sumBy(products, (e) => e.price * e.prdCount);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    };

    Noti("success", "Đăt hành thành công");
    dispatch(setAddCart([]));
    dispatch(setInforPay(false));
  };

  const handleLogin = () => {
    dispatch(setInforPay(false));
    dispatch(setSigninModal(true));
  };

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
            Xác nhận đơn hàng
          </Typography>

          <Box
            display={"flex"}
            maxHeight={600}
            overflow="auto"
            flexDirection="column"
            gap={2}
            pt={3}
          >
            {products.map((product, i) => (
              <CartItem key={i} product={product} />
            ))}
          </Box>

          <Box pt={3}>
            {/* voucher */}
            <Box
              display="flex"
              flexDirection={"row"}
              justifyContent="space-between"
              gap={4}
              pb={3}
            >
              <TextField label="Nhập mã giảm giá" fullWidth />
              <Button variant="outlined" fullWidth>
                Áp dụng
              </Button>
            </Box>

            <Divider>
              <Chip label="Thông tin người nhận" />
            </Divider>
            {/* form */}
            <Box component="form" onSubmit={handleSubmit} pb={3}>
              <TextField
                defaultValue={user.fullname}
                sx={{ width: "45%" }}
                label="Họ tên người nhận"
                name="name"
                required
                margin="normal"
              />
              <TextField
                sx={{ width: "45%", marginLeft: "10%" }}
                name="phone"
                defaultValue={user.phone}
                fullWidth
                label="Số điện thoại"
                required
                margin="normal"
              />
              <TextField
                required
                defaultValue={user.address}
                fullWidth
                name="address"
                label="Thêm địa chỉ"
                margin="normal"
              />
              {/* price */}
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
                  {currentFormat(sumPrice())}
                </Typography>
              </Box>
              <Button
                color="success"
                variant="contained"
                fullWidth
                type="submit"
              >
                Thanh toán
              </Button>
            </Box>
          </Box>

          <Divider sx={{ mb: 1 }}>
            <Chip label="Đã có tài khoản?" />
          </Divider>
          <Button fullWidth variant="outlined" onClick={handleLogin}>
            Đăng nhập
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
