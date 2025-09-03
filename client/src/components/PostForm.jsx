// client/src/components/PostForm.jsx
import React, { useState } from "react";
import API from "../utils/axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";

const PostForm = ({ onPostCreated }) => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() && !file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("description", description);
    if (file) formData.append("picture", file);

    try {
      const { data } = await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDescription("");
      setFile(null);
      onPostCreated(data);
    } catch (err) {
      console.error("Failed to create post", err);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto", p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create a Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="What's on your mind?"
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ width: "fit-content" }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
            {file && (
              <Typography variant="body2">
                Selected file: {file.name}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post"}
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;
