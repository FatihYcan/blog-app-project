import { Button, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import Card from "../components/blog/Card";
import { Link } from "react-router-dom";
import SkeletonCard from "../pages/SkeletonCard";

const MyBlogs = () => {
  const { getUsers } = useBlogCalls();
  const { userId } = useSelector((state) => state.auth);
  const { users, pagination } = useSelector((state) => state.blog);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers("blogs", { id: userId });
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getUsers("blogs", { id: userId });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handlePage = (event, value) => {
    setPage(value);
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexFlow: "wrap",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "83vh",
        }}
      >
        {loading ? (
          Array.from({ length: users.length }).map((_, index) => (
            <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
              <SkeletonCard />
            </Grid>
          ))
        ) : users.length === 0 ? (
          <>
            <Stack
              spacing={2}
              sx={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" color="error" align="center">
                Blog Not Found...
              </Typography>
              <Button variant="contained" component={Link} to="/new-blog">
                WRITE BLOG
              </Button>{" "}
            </Stack>
          </>
        ) : (
          <>
            {users.map((item, i) => (
              <Card {...item} />
            ))}
          </>
        )}
      </Grid>
      {users.length > 0 && (
        <Stack
          spacing={2}
          sx={{ margin: 3, alignItems: "center", justifyContent: "center" }}
        >
          <Pagination
            color="primary"
            count={pagination?.pages?.total}
            page={page}
            onChange={handlePage}
          />
        </Stack>
      )}
    </React.Fragment>
  );
};

export default MyBlogs;
