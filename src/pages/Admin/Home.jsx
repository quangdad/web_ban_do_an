import { Box, Container, Grid, Paper, Typography, styled } from "@mui/material";
import React from "react";
import LineChart from "./Charts/LineChart";
import PieChart from "./Charts/PieChart";

const headerAdmin = [
  {
    title: "Users",
    data: 12,
  },
  {
    title: "Products",
    data: 4,
  },
  {
    title: "Producers",
    data: 3,
  },
  {
    title: "Orders",
    data: 15,
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
        backgroundImage: "linear-gradient(147deg, #FFE53B 0%, #59058D 74%)",
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
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
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

        <Grid container spacing={2}>
          <Grid item sx={8}>
            <Item>
              <LineChart />
            </Item>
          </Grid>
          <Grid item sx={4}>
            <Item>
              <PieChart />
            </Item>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
