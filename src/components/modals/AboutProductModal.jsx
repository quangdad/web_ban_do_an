import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowProdctModal } from "../../redux/reducers/modalReducer";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import { IconButton } from "@mui/material";
import Noti from "../common/Toast";
import { setAddCart } from "../../redux/reducers/productReducer";
import { currentFormat } from "../common/FormatCurrency";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

export default function AboutProductModal() {
  const [heart, setHeart] = useState(0);

  const showProduct = useSelector((state) => state.modal.showProductModal);
  const cart = useSelector((state) => state.products.addCart);
  const open = showProduct.status;

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setShowProdctModal({ status: false, data: {} }));
  };

  const handleAddProduct = () => {
    dispatch(
      setAddCart([
        ...cart,
        {
          ...showProduct.data,
          prdCount: 1,
        },
      ])
    );
    Noti("success", "Đã thêm vào giỏ hàng");
    dispatch(setShowProdctModal({ status: false, data: {} }));
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
          <Box display={"flex"} flexDirection="row" gap={5}>
            <img
              src={showProduct.data.image}
              alt={showProduct.data.name}
              style={{ width: "400px", height: "400px" }}
            />
            <Box
              width={"400px"}
              display="flex"
              flexDirection={"column"}
              alignItems="center"
              justifyContent={"center"}
              gap={5}
            >
              <Typography variant="h3" fontWeight={500}>
                {showProduct.data.name}
              </Typography>
              <Typography>{showProduct.data.description}</Typography>
              <Typography variant="h5" color={"orange"}>
                {currentFormat(showProduct.data.price)}
              </Typography>
              <Button variant="contained" onClick={handleAddProduct}>
                Thêm vào giỏ hàng <AddShoppingCartIcon />
              </Button>
            </Box>
            <Box display={"flex"} flexDirection="column" gap={2}>
              <IconButton onClick={() => setHeart(heart + 1)}>
                {heart < 1 ? (
                  <FavoriteBorderIcon color="error" />
                ) : (
                  <FavoriteIcon color="error" />
                )}
              </IconButton>
              <IconButton>
                <ShareLocationIcon color="primary" />
              </IconButton>
              <IconButton>
                <ShareIcon color="secondary" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
