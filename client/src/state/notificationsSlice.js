// client/src/state/notificationsSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for notifications
const initialState = {
  unreadLikes: 0,
  unreadComments: 0,
  unreadMessages: 0, // 🔥 optional future use (chat system, DMs)
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // Setters
    setUnreadLikes: (state, action) => {
      state.unreadLikes = action.payload;
    },
    setUnreadComments: (state, action) => {
      state.unreadComments = action.payload;
    },
    setUnreadMessages: (state, action) => {
      state.unreadMessages = action.payload;
    },

    // Incrementers
    incrementLikes: (state) => {
      state.unreadLikes += 1;
    },
    incrementComments: (state) => {
      state.unreadComments += 1;
    },
    incrementMessages: (state) => {
      state.unreadMessages += 1;
    },

    // Clearers
    clearLikes: (state) => {
      state.unreadLikes = 0;
    },
    clearComments: (state) => {
      state.unreadComments = 0;
    },
    clearMessages: (state) => {
      state.unreadMessages = 0;
    },

    // Clear all
    clearNotifications: (state) => {
      state.unreadLikes = 0;
      state.unreadComments = 0;
      state.unreadMessages = 0;
    },
  },
});

// Export actions
export const {
  setUnreadLikes,
  setUnreadComments,
  setUnreadMessages,
  incrementLikes,
  incrementComments,
  incrementMessages,
  clearLikes,
  clearComments,
  clearMessages,
  clearNotifications,
} = notificationsSlice.actions;

// Export reducer
export default notificationsSlice.reducer;
