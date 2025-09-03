// client/src/components/UserWidget.jsx
import React from "react";
import { Card, CardHeader, CardContent, Avatar, Typography, Divider } from "@mui/material";

const UserWidget = ({ user }) => {
  if (!user) return null;

  const userInitial = user.firstName ? user.firstName[0] : "U";
  const fullName = `${user.firstName || "Unknown"} ${user.lastName || ""}`;

  return (
    <Card sx={{ maxWidth: 300, margin: "20px auto" }}>
      <CardHeader
        avatar={<Avatar>{userInitial}</Avatar>}
        title={fullName}
        subheader={user.email}
      />
      <Divider />
      {user.bio && (
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {user.bio}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default UserWidget;
