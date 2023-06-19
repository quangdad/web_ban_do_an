import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setEditProductModal } from "../../../redux/reducers/modalReducer";

const ProductCard = ({ product, admin = 1, handleDelete, loading }) => {
  const dispatch = useDispatch();

  return (
    <Box>
      <Card
        sx={{
          width: 255,
          height: 350,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          width={"auto"}
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            fontWeight={600}
            component="div"
            sx={{
              height: 58,
              overflowWrap: "break-word",
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: 58,
              overflowWrap: "break-word",
            }}
          >
            {product.description}
          </Typography>
        </CardContent>
        {admin === 0 && (
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
              backdropFilter: "blur(3px)",
              marginTop: "auto",
            }}
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDelete(product._id)}
              sx={{ width: "30%" }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ width: "30%" }}
              onClick={() =>
                dispatch(setEditProductModal({ status: true, data: product }))
              }
            >
              Edit
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
};

export default ProductCard;
