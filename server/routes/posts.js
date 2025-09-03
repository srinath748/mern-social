import express from "express";
import verifyToken from "../middleware/auth.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import upload from "../middleware/upload.js"; // ✅ now correct

const router = express.Router();

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
      picturePath: req.file ? `/assets/${req.file.filename}` : "",
      userPicturePath: user.picturePath || "",
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
