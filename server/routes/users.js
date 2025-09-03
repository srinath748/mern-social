import express from "express";
import verifyToken from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

/* -------------------- Get User by ID -------------------- */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- Get All Users (optional) -------------------- */
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;   // ✅ must be at the end, only once
