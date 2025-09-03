import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-social-3.onrender.com/api", // ✅ your backend
});

// ✅ Attach token to every request if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // always fresh
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
