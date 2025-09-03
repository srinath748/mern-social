// server/routes/posts.js
import express from "express";
import verifyToken from "../middleware/auth.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Use env backend URL (for deployed) or localhost (for dev)
const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";

/* -------------------- Get All Posts -------------------- */
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- Create Post (with optional image) -------------------- */
router.post("/", verifyToken, upload.single("picture"), async (req, res) => {
  try {
    const { description } = req.body;

    const user = await User.findById(req.user.id).select(
      "firstName lastName picturePath"
    );
    if (!user) return res.status(404).json({ msg: "User not found" });

    const newPost = new Post({
      userId: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      description: description || "",
      picturePath: req.file
        ? `${backendUrl}/assets/${req.file.filename}`
        : "",
      userPicturePath: user.picturePath
        ? `${backendUrl}${user.picturePath}`
        : "",
      likes: new Map(),
      comments: [],
      createdAt: new Date(),
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
