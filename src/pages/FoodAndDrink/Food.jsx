import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Tabsbar from "../../components/Tabs";
import _ from "lodash";
import { useState } from "react";
import { useEffect } from "react";

const Food = () => {
  const [products, setProducts] = useState([]);
  const productsData = useSelector((state) => state.products.data);

  useEffect(() => {
    const getProduct = () => {
      setProducts(
        _.filter(productsData, (e) => e.type.split("/")[0] === "food")
      );
    };
    getProduct();
  }, [productsData]);

  return (
    <Box minHeight={"100vh"}>
      {products && <Tabsbar header={0} products={products} />}
    </Box>
  );
};

export default Food;
