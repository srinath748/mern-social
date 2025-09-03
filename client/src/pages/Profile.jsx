// client/src/pages/Profile.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/axios";
import {
  Container,
  Typography,
  Avatar,
  Card,
  Stack,
  CircularProgress,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import PostCard from "../components/PostCard";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // ✅ Backend URL (for profile + post images)
  const backendUrl = process.env.REACT_APP_API_URL || "https://mern-social-3.onrender.com";

  // Fetch user profile
  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/users/${userId}`);
      const { user, posts } = data;

      setUser(user);
      setPosts(posts || []);
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
    } catch (err) {
      console.error("❌ Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Update profile
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);

      // ⚠️ must match backend multer field name (check your users.js)
      if (profilePicture) formData.append("picture", profilePicture);

      const { data } = await API.put(`/users/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(data.user);
      setEditMode(false);
      setProfilePicture(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error("❌ Failed to update profile", err);
      alert("Failed to update profile");
    }
  };

  // Handle file input change and preview
  const handleProfilePictureChange = (file) => {
    setProfilePicture(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  if (loading) {
    return (
      <Stack alignItems="center" sx={{ mt: 8 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (!user) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 8 }}>
        User not found.
      </Typography>
    );
  }

  // ✅ Build full profile picture URL
  const profilePicUrl = previewUrl
    ? previewUrl
    : user.profilePicture
    ? `${backendUrl}/assets/${user.profilePicture}`
    : null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* User info */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={profilePicUrl}
            alt={user.firstName}
            sx={{ width: 80, height: 80 }}
          />
          <div style={{ flex: 1 }}>
            {editMode ? (
              <>
                <TextField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{ mb: 1 }}
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{ mb: 1 }}
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 1 }}
                  fullWidth
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleProfilePictureChange(e.target.files[0])
                  }
                  style={{ marginBottom: "0.5rem" }}
                />
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <Typography variant="h5" component="div">
                  {`${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="div"
                >
                  {user.email}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </Button>
              </>
            )}
          </div>
        </Stack>
      </Card>

      {/* User posts */}
      <Typography variant="h6" gutterBottom component="div">
        Posts by {user.firstName}
      </Typography>

      {posts.length === 0 ? (
        <Typography component="div">No posts yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} key={post._id}>
              <PostCard
                post={post}
                onLike={(updatedPost) =>
                  setPosts(
                    posts.map((p) =>
                      p._id === updatedPost._id ? updatedPost : p
                    )
                  )
                }
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Profile;
