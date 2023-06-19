import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Product from "../Product";
import { productType } from "../../access/dataType/TypeProducts";
import _ from "lodash";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box display={"flex"} flexDirection="row" gap={3}>
            {children}
          </Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Tabsbar({ header, products }) {
  const [value, setValue] = React.useState(0);
  const [type, setType] = React.useState(productType[header].data[0].type);
  const [indexTab, setIndexTab] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getProduct = (t) =>
    _.filter(products, (e) => e.type.split("/")[1] === t);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {productType[header].data.map((e, i) => (
            <Tab
              key={i}
              label={e.text}
              {...a11yProps(i)}
              onClick={() => {
                setType(e.type);
                setIndexTab(i);
              }}
            />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={value} index={indexTab}>
        <Box display={"flex"} flexWrap="wrap" gap={3} justifyContent="center">
          {type === productType[header].data[0].type
            ? products.map((product, i) => (
                <Box key={i}>
                  <Product product={product} />
                </Box>
              ))
            : getProduct(type).map((product, i) => (
                <Box key={i}>
                  <Product product={product} />
                </Box>
              ))}
        </Box>
      </TabPanel>
    </Box>
  );
}
