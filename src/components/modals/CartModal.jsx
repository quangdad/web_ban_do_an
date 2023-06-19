import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartModal,
  setPayModal,
  setSigninModal,
} from "../../redux/reducers/modalReducer";
import { Button, IconButton, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import _ from "lodash";
import { currentFormat } from "../../components/common/FormatCurrency";
import { useState } from "react";

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

export default function CartModal() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.cart);
  const user = useSelector((state) => state.user.data);

  const products = useSelector((state) => state.products.addCart);

  const handleClose = () => {
    dispatch(setCartModal(false));
  };

  const handlePay = () => {
    dispatch(setCartModal(false));
    user._id ? dispatch(setPayModal(true)) : dispatch(setSigninModal(true));
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
            Giỏ hàng
          </Typography>
          {products.length > 0 ? (
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
          ) : (
            <Typography align="center" pt={2}>
              Chưa có sản phẩm
            </Typography>
          )}

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
              <Button
                color="success"
                variant="contained"
                fullWidth
                onClick={handlePay}
              >
                Thanh toán
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
