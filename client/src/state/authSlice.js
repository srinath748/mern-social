// client/src/state/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Persist config
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"], // only persist user and token
};

export const { setLogin, setLogout } = authSlice.actions;

// Export persisted reducer
export default persistReducer(persistConfig, authSlice.reducer);
