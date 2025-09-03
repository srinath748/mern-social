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

      // ✅ Save token to localStorage for axios
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;

      // ✅ Clear from localStorage
      localStorage.removeItem("token");
    },
  },
});

// ✅ Persist config
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"], // keep only user + token
};

export const { setLogin, setLogout } = authSlice.actions;

// ✅ Export persisted reducer
export default persistReducer(persistConfig, authSlice.reducer);
