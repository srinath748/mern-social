// client/src/state/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initialize theme from localStorage or default to 'light'
const initialState = {
  mode: localStorage.getItem("themeMode") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      // Save the current mode to localStorage
      localStorage.setItem("themeMode", state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload; // expects 'light' or 'dark'
      localStorage.setItem("themeMode", state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
