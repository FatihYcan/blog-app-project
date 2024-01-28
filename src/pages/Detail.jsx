import * as React from "react";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Button, Container, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import CommentCard from "../components/blog/CommentCard";
import CommentForm from "../components/blog/CommentForm";
import UpdateModal from "../components/blog/UpdateModal";

export default function Detail() {
  const { _id } = useParams();
  const { details } = useSelector((state) => state.blog);
  const { user, userId, username } = useSelector((state) => state.auth);
  const { getDetails, postLikes, deleteBlogs, getBlogs } = useBlogCalls();
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { title, content, image, likes, comments, createdAt, countOfVisitors } =
    details;

  React.useEffect(() => {
    getDetails("blogs", { id: _id });
  }, []);

  const [data, setData] = React.useState({
    title: details.title,
    image: details.image,
    category: details.category,
    status: details.status,
    content: details.content,
  });

  const handleDelete = () => {
    deleteBlogs("blogs", _id);
  };

  const name = details.userId ? details.userId.username : "";

  return (
    <Container maxWidth="lg" sx={{ minHeight: "90vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "2rem",
        }}
      >
        <Box
          sx={{
            "@media (min-width:600px)": {
              minWidth: "70%",
              maxWidth: "70%",
            },
            marginTop: "3rem",
          }}
        >
          <CardMedia component="img" alt={title} image={image} />
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
            }
            title={name}
            subheader={
              details.categoryId?.createdAt &&
              new Date(details.categoryId.createdAt).toLocaleString()
            }
          />
          <CardContent>
            <Typography component="h1" variant="body1" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              {likes?.includes(userId) ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteIcon />
              )}
              <span> {likes?.length || 0} </span>
            </IconButton>
            <IconButton aria-label="comments" onClick={() => setShow(!show)}>
              <ChatBubbleOutlineIcon />
              <span> {comments?.length || 0}</span>
            </IconButton>
            <IconButton aria-label="view">
              <VisibilityOutlinedIcon />
              <span> {countOfVisitors}</span>
            </IconButton>
          </CardActions>
          {name === username && (
            <Box my={2} display="flex" justifyContent="center">
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "blue" }}
                onClick={() => handleOpen()}
              >
                Update Blog
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                sx={{ marginLeft: "1rem" }}
                onClick={() => handleDelete()}
              >
                Delete Blog
              </Button>
            </Box>
          )}

          {show && (
            <>
              <CommentForm />
              {comments?.map((item, i) => (
                <CommentCard key={i} {...item} />
              ))}
            </>
          )}
          <UpdateModal
            open={open}
            handleClose={handleClose}
            setData={setData}
            data={data}
          />
        </Box>
      </Box>
    </Container>
  );
}
