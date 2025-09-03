// client/src/state/notificationsSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for notifications
const initialState = {
  unreadLikes: 0,
  unreadComments: 0,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // Set the number of unread likes
    setUnreadLikes: (state, action) => {
      state.unreadLikes = action.payload;
    },

    // Set the number of unread comments
    setUnreadComments: (state, action) => {
      state.unreadComments = action.payload;
    },

    // Increment likes by 1
    incrementLikes: (state) => {
      state.unreadLikes += 1;
    },

    // Increment comments by 1
    incrementComments: (state) => {
      state.unreadComments += 1;
    },

    // Clear all notifications
    clearNotifications: (state) => {
      state.unreadLikes = 0;
      state.unreadComments = 0;
    },
  },
});

// Export actions
export const {
  setUnreadLikes,
  setUnreadComments,
  incrementLikes,
  incrementComments,
  clearNotifications,
} = notificationsSlice.actions;

// Export reducer
export default notificationsSlice.reducer;
