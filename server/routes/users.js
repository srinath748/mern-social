// server/routes/users.js
import express from "express";
import verifyToken from "../middleware/auth.js";
import User from "../models/User.js";
import upload from "../middleware/upload.js";

const router = express.Router();
const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";

/* -------------------- Get User -------------------- */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Attach absolute URL to picturePath
    const userObj = user.toObject();
    if (userObj.picturePath) {
      userObj.picturePath = `${backendUrl}${userObj.picturePath}`;
    }

    res.json(userObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- Upload/Update Profile Picture -------------------- */
router.post(
  "/:id/picture",
  verifyToken,
  upload.single("picture"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ msg: "User not found" });

      if (req.file) {
        user.picturePath = `/assets/${req.file.filename}`;
      }

      const updatedUser = await user.save();
      const userObj = updatedUser.toObject();

      // return absolute URL
      if (userObj.picturePath) {
        userObj.picturePath = `${backendUrl}${userObj.picturePath}`;
      }

      res.json(userObj);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
