import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import Card from "../components/blog/Card";
import { Grid } from "@mui/material";

const Dashboard = () => {
  const { blogs, loading, error } = useSelector((state) => state.blog);
  const { getBlogs } = useBlogCalls();

  useEffect(() => {
    getBlogs("blogs");
  }, []);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexFlow: "wrap",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      {blogs?.map((item, i) => (
        <Card {...item} key={i} />
      ))}
    </Grid>
  );
};

export default Dashboard;
