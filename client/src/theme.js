// client/src/theme.js
import { createTheme } from "@mui/material/styles";

// Function to create theme dynamically based on mode
const getTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode, // 'light' or 'dark'
      primary: {
        main: "#1976d2", // blue
      },
      secondary: {
        main: "#f50057", // pink
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
      text: {
        primary: mode === "light" ? "#333333" : "#ffffff",
        secondary: mode === "light" ? "#555555" : "#aaaaaa",
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 500 },
      h6: { fontWeight: 500 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow:
              mode === "light"
                ? "0 4px 12px rgba(0,0,0,0.1)"
                : "0 4px 12px rgba(0,0,0,0.4)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#fff" : "#2a2a2a",
            borderRadius: 8,
          },
        },
      },
    },
  });

export default getTheme;
