// client/src/components/PostCard.jsx
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

const PostCard = ({ post, onLike }) => {
  const [comment, setComment] = useState("");

  const handleLike = async () => {
    try {
      const { data } = await API.patch(`/posts/${post._id}/like`);
      onLike(data);
    } catch {
      alert("Failed to like post");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      const { data } = await API.post(`/posts/${post._id}/comment`, { text: comment });
      setComment("");
      onLike(data);
    } catch {
      alert("Failed to comment");
    }
  };

  const postFirstInitial = post.firstName?.[0]?.toUpperCase() || "U";
  const postFullName = `${post.firstName || "Unknown"} ${post.lastName || ""}`.trim();

  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
      {/* Post header */}
      <CardHeader
        avatar={<Avatar>{postFirstInitial}</Avatar>}
        title={<Typography variant="body1" component="div">{postFullName}</Typography>}
        subheader={
          <Typography variant="caption" color="text.secondary" component="div">
            {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
          </Typography>
        }
      />

      {/* Post content */}
      <CardContent>
        <Typography variant="body1" gutterBottom component="div">
          {post.description}
        </Typography>
        {post.picturePath && (
          <img
            src={`http://localhost:5000${post.picturePath}`}
            alt="post"
            style={{ maxWidth: "100%", borderRadius: 4 }}
          />
        )}
      </CardContent>

      {/* Actions */}
      <CardActions>
        <IconButton
          onClick={handleLike}
          color={post.likes && Object.keys(post.likes).length > 0 ? "error" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography sx={{ ml: 0.5 }} component="div">
          {post.likes ? Object.keys(post.likes).length : 0}
        </Typography>

        <IconButton>
          <ChatBubbleIcon />
        </IconButton>
        <Typography sx={{ ml: 0.5 }} component="div">
          {post.comments?.length || 0}
        </Typography>
      </CardActions>

      {/* Comment input */}
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
            <Button type="submit" variant="contained" color="primary">
              Comment
            </Button>
          </Stack>
        </form>

        {/* Comments list */}
        {post.comments?.length > 0 && (
          <List sx={{ mt: 2 }}>
            {post.comments.map((c) => (
              <React.Fragment key={c._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>{c.firstName?.[0]?.toUpperCase() || "U"}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" component="span">
                        {`${c.firstName || "Unknown"} ${c.lastName || ""}`.trim()}
                      </Typography>
                    }
                    secondary={
                      <Stack spacing={0.3} component="span">
                        <Typography variant="body2" component="span">
                          {c.text}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" component="span">
                          {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                        </Typography>
                      </Stack>
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

