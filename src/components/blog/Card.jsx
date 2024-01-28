import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BlogCard({
  _id,
  id,
  title,
  content,
  image,
  comments,
  likes,
  countOfVisitors,
  createdAt,
}) {
  const { user, userId } = useSelector((state) => state.auth);
  const { postLikes, getDetails } = useBlogCalls();
  const navigate = useNavigate();

  const handleLike = () => {
    userId ? postLikes("blogs", _id) : navigate("/login");
  };

  // const handleDetail = async () => {
  //   if (user) {
  //     await getDetails("blogs", _id).then(() => {
  //       navigate(`/detail/${_id}/`);
  //     });
  //   } else {
  //     navigate("/login");
  //   }
  // }; //! çalışan fonskiyon

  // const handleDetail = async () => {
  //   if (user) {
  //     await getDetails("blogs", { id: _id }).then(() => {
  //       navigate(`/detail/${_id}/`);
  //     });
  //   } else {
  //     navigate("/login");
  //   }
  // }; //! 2. çalışan

  const handleDetail = () => {
    if (user) {
      navigate(`/detail/${_id}/`);
    } else {
      navigate("/login");
    }
  };

  return (
    <Grid item key={_id} xs={12} md={6} lg={4} xl={3}>
      <Card elevation={24} sx={{ margin: "10px" }}>
        <CardMedia
          component="img"
          alt={title}
          image={image}
          sx={{
            height: "175px",
            width: "350px",
            margin: "auto",
            objectFit: "contain",
            paddingTop: 2,
          }}
        />

        <CardContent sx={{ height: "150px" }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              textTransform: "uppercase",
              textAlign: "center",
              color: "#0d47a1",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: "40px" }}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2,
              marginBottom: "1rem",
              textAlign: "left",
            }}
          >
            {content}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: "1rem" }}
          >
            Published Date : {createdAt && new Date(createdAt).toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <IconButton aria-label="add to favorites" onClick={handleLike}>
              {likes?.includes(userId) ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteIcon />
              )}
              <span> {likes.length} </span>
            </IconButton>

            <IconButton aria-label="comments">
              <ChatBubbleOutlineIcon />
              <span> {comments.length}</span>
            </IconButton>
            <IconButton aria-label="view">
              <VisibilityOutlinedIcon />
              <span> {countOfVisitors}</span>
            </IconButton>
          </div>
          <Button
            variant="contained"
            sx={{ marginLeft: "auto" }}
            onClick={handleDetail}
          >
            READ MORE
          </Button>
        </CardActions>
      </Card>
    
    </Grid>
    
  );
}
