import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { useSelector } from "react-redux";

const NewBlog = () => {
  const { categories, loading, error } = useSelector((state) => state.blog);
  const { getBlogs, postBlogs, getCategories } = useBlogCalls();

  const [data, setData] = React.useState({
    title: "",
    image: "",
    categoryId: "",
    isPublished: true,
    content: "",
  });

  useEffect(() => {
    getBlogs("blogs");
    getCategories("categories");
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postBlogs("blogs", data);
    setData({
      title: "",
      image: "",
      categoryId: "",
      isPublished: "",
      content: "",
    });
  };

  return (
    <Container maxWidth="xs" sx={{ minHeight: "81vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "white",
          border: "2px solid white",
          borderRadius: "10px",
          boxShadow: "24px 12px 12px 12px",
          marginTop: "16px",
          marginBottom: "16px",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: "8px" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "left", mb: -1, fontFamily: "fantasy" }}
          >
            New Blog
          </Typography>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Title"
              name="title"
              id="title"
              type="text"
              variant="outlined"
              required
              onChange={handleChange}
              value={data.title}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Image"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              required
              onChange={handleChange}
              value={data.image}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel variant="outlined" id="category-label" required>
              Category
            </InputLabel>
            <Select
              labelId="category-label"
              label="Category"
              id="categoryId"
              name="categoryId"
              value={data.categoryId}
              onChange={handleChange}
            >
              {categories?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-label" required>
              Status
            </InputLabel>
            <Select
              labelId="status-label"
              id="isPublished"
              name="isPublished"
              value={data.isPublished}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="false">Draft</MenuItem>
              <MenuItem value="true">Published</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              placeholder="Content"
              multiline
              rows={3}
              label="Content"
              name="content"
              id="content"
              type="text"
              variant="outlined"
              required
              onChange={handleChange}
              value={data.content}
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ my: "1rem", borderRadius: "1rem" }}
          >
            New Blog
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewBlog;