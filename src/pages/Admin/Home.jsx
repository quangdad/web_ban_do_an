import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import LineChart from "./Charts/LineChart";

const headerAdmin = [
  {
    title: "Users",
    data: 12,
  },
  {
    title: "Products",
    data: 38,
  },
  {
    title: "Producers",
    data: 23,
  },
  {
    title: "Orders",
    data: 45,
  },
  {
    title: "New Order",
    data: 4,
  },
];

const Home = () => {
  const BoxInfo = ({ title, data }) => (
    <Paper
      sx={{
        padding: 2,
        width: "170px",
        backgroundColor: "#FFE53B",
        backgroundImage: "linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)",
        color: "white",
      }}
    >
      <Typography fontWeight={600} variant="h5">
        {title}
      </Typography>
      <Typography fontWeight={500} variant={"h6"}>
        {data} +
      </Typography>
    </Paper>
  );
  return (
    <Box>
      <Container sx={{ p: 6 }}>
        <Grid container spacing={2}>
          {headerAdmin.map((e, i) => (
            <Grid item xs={2} key={i}>
              <BoxInfo title={e.title} data={e.data} />
            </Grid>
          ))}
        </Grid>

        <Box>
          <LineChart />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
