// client/src/state/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import authReducer from "./authSlice";
import postsReducer from "./postsSlice";
import themeReducer from "./themeSlice";
import notificationsReducer from "./notificationsSlice";

// ✅ Persist config for auth slice
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"], // only persist token and user
};

// ✅ Combine reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  posts: postsReducer, // posts do not need persistence
  theme: themeReducer, // theme slice
  notifications: notificationsReducer, // notifications slice
});

// ✅ Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// ✅ Create persistor
export const persistor = persistStore(store);
