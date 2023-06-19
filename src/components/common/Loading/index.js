import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";

export default function Loading() {
  const loading = useSelector((s) => s.loading).status;
  return (
    <Box
      sx={{
        width: loading ? "100%" : "0",
        position: "absolute",
        zIndex: 100000,
      }}
    >
      <LinearProgress />
    </Box>
  );
}
