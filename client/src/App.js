// client/src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "./components/navbar/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  const token = useSelector((state) => state.auth.token);
  const themeMode = useSelector((state) => state.theme.mode);

  const theme = createTheme({
    palette: {
      mode: themeMode, // 'light' or 'dark'
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="md" sx={{ padding: "2rem 0" }}>
        <Routes>
          {/* Protected Home route */}
          <Route
            path="/"
            element={token ? <Home /> : <Navigate to="/login" />}
          />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Profile route */}
          <Route path="/profile/:userId" element={token ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
