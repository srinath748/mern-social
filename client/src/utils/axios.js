// client/src/utils/axios.js
import axios from "axios";

// ✅ Use environment variable, fallback to Render backend
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
    ? `${process.env.REACT_APP_API_URL}/api`
    : "https://mern-social-3.onrender.com/api",
});

// ✅ Attach token to every request if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
