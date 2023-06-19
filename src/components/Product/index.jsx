import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setShowProdctModal } from "../../redux/reducers/modalReducer";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Noti from "../../components/common/Toast";
import { setAddCart } from "../../redux/reducers/productReducer";
import { currentFormat } from "../common/FormatCurrency";

export default function Product({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.addCart);

  const handleClick = () => {
    dispatch(setShowProdctModal({ status: true, data: product }));
  };
  const handleAddProduct = () => {
    dispatch(
      setAddCart([
        ...cart,
        {
          ...product,
          prdCount: 1,
        },
      ])
    );
    Noti("success", "Đã thêm vào giỏ hàng");
  };
  return (
    <Card
      sx={{
        width: 200,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardMedia
          component="img"
          height="150px"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h6" fontWeight={500} align="center">
            {product.name}
          </Typography>
          <Typography
            marginTop={"auto"}
            variant="h5"
            fontWeight={500}
            align="center"
            color={"orange"}
          >
            {currentFormat(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button
        variant="contained"
        fullWidth
        onClick={handleAddProduct}
        sx={{
          marginTop: "auto",
        }}
      >
        <AddShoppingCartIcon />
      </Button>
    </Card>
  );
}
