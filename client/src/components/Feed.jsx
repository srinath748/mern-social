// client/src/components/Feed.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import PostForm from "./PostForm";
import Post from "./Post"; // ✅ Use Post (your component with images)
import {
  Container,
  Typography,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const { data } = await API.get("/posts");
      setPosts(data);
    } catch (err) {
      console.error("❌ Failed to load posts:", err);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✅ Add new post to top
  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // ✅ Update a post when liked/commented
  const handleLikeUpdated = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <PostForm onPostCreated={handlePostCreated} />

      {loading ? (
        <Stack alignItems="center" sx={{ my: 4 }}>
          <CircularProgress />
        </Stack>
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      ) : posts.length === 0 ? (
        <Typography align="center">No posts yet.</Typography>
      ) : (
        posts.map((post) => (
          <Post key={post._id} post={post} onLike={handleLikeUpdated} />
        ))
      )}
    </Container>
  );
};

export default Feed;
