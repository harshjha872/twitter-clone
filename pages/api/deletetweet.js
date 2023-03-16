import mongoose from "mongoose";
import Tweet from "@/Models/Tweet";
import User from "@/Models/User";
import { use } from "react";

const delTweet = async (req, res) => {
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(401).json({ message: "No Data in Req" });
    }
    const { _id, email } = req.body;
    if (!_id) return res.status(401).json({ message: "no tweet found" });
    if (!email) return res.status(401).json({ message: "no email found" });

    try {
      await mongoose.connect(process.env.MONGO_URI);
      const user = await User.findOne({ email: email });
      const newArrTweets = user.tweets.filter(
        (ele) => ele.toString() !== _id.toString()
      );
      const newArrBookmark = user.bookmarks.filter(
        (ele) => ele.toString() !== _id.toString()
      );
      user.tweets = newArrTweets;
      user.bookmarks = newArrBookmark;
      await user.save();
      await Tweet.findByIdAndDelete(_id);
      res.json({ message: "Tweet deleted" });
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(405).json({ message: "Invalid req type" });
  }
};

export default delTweet;
