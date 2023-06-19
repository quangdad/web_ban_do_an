import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  setInforPay,
  setShowProdctModal,
} from "../../../redux/reducers/modalReducer";
import { currentFormat } from "../../common/FormatCurrency";

const Item = ({ product }) => {
  const dispatch = useDispatch();
  const handleShowProduct = () => {
    dispatch(setShowProdctModal({ status: true, data: product }));
  };
  return (
    <Box
      display={"flex"}
      flexDirection="row"
      gap={3}
      sx={{ cursor: "pointer" }}
      alignItems="center"
      onClick={handleShowProduct}
    >
      <Avatar src={product.image} />
      <Box display={"flex"} flexDirection="column">
        <Typography variant="h6" fontWeight={600}>
          {product.name}
        </Typography>
        <Typography color={"orange"}>{currentFormat(product.price)}</Typography>
      </Box>
    </Box>
  );
};

const SearchItem = ({ products }) => {
  return (
    <Box
      position={"absolute"}
      bgcolor="white"
      color={"black"}
      width={260}
      maxHeight={500}
      overflow="auto"
      borderRadius="5px"
      p={1}
      display="flex"
      gap={1}
      flexDirection="column"
      top={60}
    >
      {products?.map((product, i) => (
        <Paper key={i}>
          <Item product={product} />
        </Paper>
      ))}
    </Box>
  );
};

export default SearchItem;
