import mongoose, { Schema } from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    postedTime: { type: Date, required: true },
    content: { type: String },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        userEmail: { type: String, required: true },
        name: { type: String, required: true },
        replyTo: { type: String, required: true },
        comment: String,
        likes: [String],
        profile_picture: String,
      },
    ],
    shareLink: { type: String, required: true },
    image:
    {
        data: Buffer,
        contentType: String,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);
