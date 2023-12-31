import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Tabsbar from "../../components/Tabs";
import _ from "lodash";
import { useSelector } from "react-redux";

const Drink = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const productsData = useSelector((state) => state.products.data);

  useEffect(() => {
    const getProducts = () => {
      try {
        setProducts(
          _.filter(productsData, (e) => e.type.split("/")[0] === "drink")
        );
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [productsData]);

  return loading ? (
    <CircularProgress />
  ) : (
    <Box minHeight={"100vh"}>
      {products && <Tabsbar header={1} products={products} />}
    </Box>
  );
};

export default Drink;
