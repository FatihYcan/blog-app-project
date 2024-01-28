import * as React from "react";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Button, Container, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";

export default function Detail() {
  const { id } = useParams();
  const { details } = useSelector((state) => state.blog);
  const { user, username } = useSelector((state) => state.auth);
  const { getDetails, postLikes, deleteBlogs } = useBlogCalls();
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    _id,
    title,
    content,
    image,
    comments,
    likes,
    countOfVisitors,
    createdAt,
  } = details;

 

  const [data, setData] = React.useState({
    title: details.title,
    image: details.image,
    category: details.category,
    status: details.status,
    content: details.content,
  });

  const handleLike = () => {
    postLikes("blogs", _id, true);
  };

  const handleDelete = () => {
    deleteBlogs(id);
  };

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
              minWidth: "80%",
              maxWidth: "80%",
            },
          }}
        >
          <CardMedia component="img" alt={title} image={image} />
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography component="h1" variant="body1" color="text.secondary">
              This impressive
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
              {/* <span> {likes.length}</span> */}
            </IconButton>
            <IconButton aria-label="comments">
              <ChatBubbleOutlineIcon />
              {/* <span> {comments.length}</span> */}
            </IconButton>
            <IconButton aria-label="view">
              <VisibilityOutlinedIcon />
              {/* <span> {countOfVisitors}</span> */}
            </IconButton>
          </CardActions>

          <form>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              <TextField
                id="outlined-multiline-static"
                label="Comment"
                name="content"
                multiline
                rows={2}
                placeholder="Add a comment"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" type="submit">
                Add Comment
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
