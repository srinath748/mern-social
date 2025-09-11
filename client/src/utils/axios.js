import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // should be https://mern-social-3.onrender.com/api
});

// Attach token automatically if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
