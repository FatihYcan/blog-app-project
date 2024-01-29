import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function CommentCard({ comment, createdAt, userId }) {
  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const [weekday, day, month, year] = formattedDate.split(" ");

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={userId.username}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body4"
                color="text.secondary"
              >
                {`${weekday} ${day} ${month} ${year}`}
              </Typography>
              <Typography color="text.primary">{comment}</Typography>
            </React.Fragment>
          }
        />
      </ListItem>

      <Divider variant="middle" component="li" />
    </>
  );
}
