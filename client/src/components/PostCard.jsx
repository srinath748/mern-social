import React, { useState } from "react";
import API from "../utils/axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const PostCard = ({ post, onUpdate }) => {
  const [comment, setComment] = useState("");

  const backendUrl =
    process.env.REACT_APP_API_BASE_URL || "https://mern-social-3.onrender.com";

  const postImage = post.picturePath ? `${backendUrl}${post.picturePath}` : null;

  const handleLike = async () => {
    try {
      const { data } = await API.patch(`/posts/${post._id}/like`);
      onUpdate(data); // update Redux store
    } catch {
      alert("Failed to like post");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      const { data } = await API.post(`/posts/${post._id}/comment`, {
        text: comment,
      });
      setComment("");
      onUpdate(data); // update Redux store
    } catch {
      alert("Failed to comment");
    }
  };

  const userInitial = post.firstName?.[0]?.toUpperCase() || "U";
  const userFullName = `${post.firstName || "Unknown"} ${post.lastName || ""}`.trim();

  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
      <CardHeader
        avatar={<Avatar>{userInitial}</Avatar>}
        title={<Typography variant="body1">{userFullName}</Typography>}
        subheader={
          <Typography variant="caption" color="text.secondary">
            {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
          </Typography>
        }
      />

      <CardContent>
        <Typography variant="body1" gutterBottom>
          {post.description}
        </Typography>
        {postImage && (
          <img
            src={postImage}
            alt="post"
            style={{ maxWidth: "100%", borderRadius: 4, marginTop: 10 }}
          />
        )}
      </CardContent>

      <CardActions>
        <IconButton
          onClick={handleLike}
          color={post.likes && Object.keys(post.likes).length > 0 ? "error" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography sx={{ ml: 0.5 }}>
          {post.likes ? Object.keys(post.likes).length : 0}
        </Typography>

        <IconButton>
          <ChatBubbleIcon />
        </IconButton>
        <Typography sx={{ ml: 0.5 }}>
          {post.comments?.length || 0}
        </Typography>
      </CardActions>

      <CardContent>
        <form onSubmit={handleComment}>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="Write a comment..."
              variant="outlined"
              size="small"
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button type="submit" variant="contained">
              Comment
            </Button>
          </Stack>
        </form>

        {post.comments?.length > 0 && (
          <List sx={{ mt: 2 }}>
            {post.comments.map((c) => (
              <React.Fragment key={c._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>{c.firstName?.[0]?.toUpperCase() || "U"}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${c.firstName || "Unknown"} ${c.lastName || ""}`.trim()}
                    secondary={
                      <>
                        <Typography variant="body2">{c.text}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
