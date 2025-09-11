import React from "react";
import { Container, Typography } from "@mui/material";
import PostsList from "../components/PostsList";

const Home = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Home Feed
      </Typography>
      <PostsList />
    </Container>
  );
};

export default Home;
