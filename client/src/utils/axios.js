import axios from "axios";

// Use deployed backend URL
const API = axios.create({
  baseURL: `https://mern-social-1-q5t5.onrender.com/api`, // deployed backend URL
});

// Attach token to every request if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
