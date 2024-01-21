import mongoose, { Schema } from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    bio: { type: String, required: false },
    profile_picture: { type: String, required: false },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    tweets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", usersSchema);
