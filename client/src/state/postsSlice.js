// client/src/state/postsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

// Fetch all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await API.get("/posts");
  return data;
});

// Add a new post (text + optional image)
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (postData) => {
    const { data } = await API.post("/posts", postData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  }
);

// Like a post
export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId }) => {
    const { data } = await API.patch(`/posts/${postId}/like`);
    return data;
  }
);

// Comment on a post
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
      // Fetch posts
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

      // Add post
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      // Like post
      .addCase(likePost.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // Comment post
      .addCase(commentPost.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

// Export slice actions and reducer
export const { updatePost } = postsSlice.actions;
export { addPost, fetchPosts, likePost, commentPost }; // ✅ export all thunks
export default postsSlice.reducer;
