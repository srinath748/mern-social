import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

function Post({ post, onLike, onComment }) {
  // Backend URL from environment variable
  const backendUrl = process.env.REACT_APP_API_URL || "https://mern-social-3.onrender.com";

  // Build full URLs for images
  const profilePic = post.userProfilePic
    ? `${backendUrl}/assets/${post.userProfilePic}`
    : undefined;

  const postImage = post.image ? `${backendUrl}/assets/${post.image}` : null;

  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
      {/* Post header with avatar, username, timestamp */}
      <CardHeader
        avatar={<Avatar src={profilePic} alt={post.username} />}
        title={post.username}
        subheader={new Date(post.createdAt).toLocaleString()}
      />

      {/* Post content */}
      <CardContent>
        <Typography variant="body1">{post.content}</Typography>
        {postImage && (
          <img
            src={postImage}
            alt="post"
            style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
          />
        )}
      </CardContent>

      {/* Post actions */}
      <CardActions>
        <IconButton onClick={() => onLike(post._id)}>
          <FavoriteIcon color={post.liked ? "error" : "inherit"} />
        </IconButton>
        <IconButton onClick={() => onComment(post._id)}>
          <CommentIcon />
        </IconButton>
        <Button size="small" variant="outlined" sx={{ marginLeft: "auto" }}>
          Share
        </Button>
      </CardActions>
    </Card>
  );
}

export default Post;
