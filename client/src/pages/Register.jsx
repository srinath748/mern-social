// client/src/pages/Register.jsx
import React, { useState } from "react";
import API from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/register", form);

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);

      let message = "Registration failed. Please try again.";
      if (err.response?.data?.msg) {
        message = err.response.data.msg;
      } else if (err.message) {
        message = err.message;
      }

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom component="div">
            Register
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Register"}
              </Button>
            </Stack>
          </form>

          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center" }}
            component="div"
          >
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
