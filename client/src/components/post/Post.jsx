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
  // ✅ Use the same BACKEND_URL everywhere
  const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  // ✅ Build full URLs for images (make sure backend serves /assets correctly)
  const profilePic = post.userProfilePic
    ? `${BACKEND_URL}/assets/${post.userProfilePic}`
    : undefined;

  const postImage = post.image
    ? `${BACKEND_URL}/assets/${post.image}`
    : null;

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
            style={{
              width: "100%",
              borderRadius: "8px",
              marginTop: "10px",
              objectFit: "cover",
            }}
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
