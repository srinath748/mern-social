import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

// Fetch posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await API.get("/posts");
  return data;
});

// Like post
export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId }) => {
    const { data } = await API.patch(`/posts/${postId}/like`);
    return data;
  }
);

// Comment post
export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async ({ postId, text }) => {
    const { data } = await API.post(`/posts/${postId}/comment`, { text });
    return data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updatePost: (state, action) => {
      const index = state.items.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) state.items[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export const { updatePost } = postsSlice.actions;
export default postsSlice.reducer;
