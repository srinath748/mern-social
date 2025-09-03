import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";

function Comments({ comments }) {
  return (
    <List sx={{ width: "100%", maxWidth: 600, margin: "0 auto", bgcolor: "background.paper" }}>
      {comments.map((comment) => (
        <React.Fragment key={comment._id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={comment.userProfilePic} alt={comment.username} />
            </ListItemAvatar>
            <ListItemText
              primary={comment.username}
              secondary={
                <Typography component="span" variant="body2" color="text.primary">
                  {comment.text}
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

export default Comments;
