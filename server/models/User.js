// server/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true },
    picturePath: { type: String, default: "" },        // profile picture path
    friends:     { type: [String], default: [] },      // array of friend userIds
    location:    { type: String, default: "" },
    occupation:  { type: String, default: "" },
    viewedProfile: { type: Number, default: 0 },
    impressions:   { type: Number, default: 0 },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

const User = mongoose.model("User", UserSchema);
export default User;
