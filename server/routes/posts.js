// server/routes/posts.js
import express from "express";
import verifyToken from "../middleware/auth.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import upload from "../middleware/upload.js";

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
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
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
      likes: new Map(), // initialize likes as Map
      comments: [],
      createdAt: new Date(),
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- Like/Unlike a Post -------------------- */
router.patch("/:id/like", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const userId = req.user.id;
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- Add Comment -------------------- */
router.post("/:id/comment", verifyToken, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === "") {
      return res.status(400).json({ msg: "Comment cannot be empty" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const user = await User.findById(req.user.id).select("firstName lastName");
    if (!user) return res.status(404).json({ msg: "User not found" });

    post.comments.push({
      userId: req.user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      text,
      createdAt: new Date(),
    });

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
