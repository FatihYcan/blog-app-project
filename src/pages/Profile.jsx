import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Container } from "@mui/material";
import { useSelector } from "react-redux";

export default function Profile() {
  const { username, email, image } = useSelector((state) => state.auth);

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
              minWidth: "50%",
              maxWidth: "50%",
            },
            marginTop: "3rem",
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              alt={username}
              image={image}
              sx={{ height: "350px", objectFit: "contain" }}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography gutterBottom variant="h5" component="div">
                {username}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {email}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Box>
      </Box>
    </Container>
  );
}
