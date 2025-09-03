// client/src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, addPost, updatePost } from "../state/postsSlice";
import PostCard from "../components/PostCard";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);

  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);

  // Fetch posts on mount
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = async () => {
    if (!newPost.trim() && !image) return;

    try {
      const formData = new FormData();
      formData.append("description", newPost);

      // ✅ must match backend multer config (upload.single("picture"))
      if (image) formData.append("picture", image);

      await dispatch(addPost(formData)).unwrap();
      setNewPost("");
      setImage(null);
    } catch (err) {
      console.error("❌ Failed to add post:", err);
      alert("Failed to add post");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Update a post when liked/commented
  const handleUpdatePost = (updatedPost) => {
    dispatch(updatePost(updatedPost));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Home Feed
      </Typography>

      {/* New Post input */}
      <Stack spacing={1} sx={{ mb: 3 }}>
        <TextField
          label="What's on your mind?"
          variant="outlined"
          fullWidth
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />

        {/* Image upload + Post button */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
        >
          <Button
            variant="outlined"
            component="label"
            startIcon={<PhotoCamera />}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {image && <Typography>{image.name}</Typography>}

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPost}
          >
            Post
          </Button>
        </Stack>
      </Stack>

      {/* Loading state */}
      {status === "loading" && (
        <Stack alignItems="center" sx={{ my: 4 }}>
          <CircularProgress />
        </Stack>
      )}

      {/* Posts list */}
      {status === "succeeded" && posts.length === 0 && (
        <Typography>No posts yet.</Typography>
      )}

      {status === "succeeded" &&
        posts.map((post) => (
          <PostCard key={post._id} post={post} onLike={handleUpdatePost} />
        ))}

      {status === "failed" && (
        <Typography color="error">Failed to load posts.</Typography>
      )}
    </Container>
  );
};

export default Home;
