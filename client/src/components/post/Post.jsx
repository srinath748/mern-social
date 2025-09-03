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
  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
      {/* Post header with avatar, username, timestamp */}
      <CardHeader
        avatar={<Avatar src={post.userProfilePic} alt={post.username} />}
        title={post.username}
        subheader={new Date(post.createdAt).toLocaleString()}
      />
      
      {/* Post content */}
      <CardContent>
        <Typography variant="body1">{post.content}</Typography>
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
