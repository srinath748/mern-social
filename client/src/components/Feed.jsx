// client/src/components/Feed.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import PostForm from "./PostForm";
import PostCard from "./PostCard";
import { Container, Typography, Stack, CircularProgress } from "@mui/material";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data } = await API.get("/posts");
      setPosts(data);
    } catch (err) {
      console.error("❌ Failed to load posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✅ Use functional updates to avoid stale state issues
  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleLikeUpdated = (updatedPost) => {
    setPosts((prev) => prev.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <PostForm onPostCreated={handlePostCreated} />

      {loading ? (
        <Stack alignItems="center" sx={{ my: 4 }}>
          <CircularProgress />
        </Stack>
      ) : posts.length === 0 ? (
        <Typography align="center">No posts yet.</Typography>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} onLike={handleLikeUpdated} />
        ))
      )}
    </Container>
  );
};

export default Feed;
