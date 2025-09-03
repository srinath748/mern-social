// server/models/Post.js
import mongoose from "mongoose";

// Subdocument schema for comments
const CommentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// Main Post schema
const PostSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    description: { type: String, default: "" },
    picturePath: { type: String, default: "" },      // path for post image
    userPicturePath: { type: String, default: "" }, // path for user's profile picture
    likes: { type: Map, of: Boolean, default: {} }, // map of userId → true
    comments: { type: [CommentSchema], default: [] }, 
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
