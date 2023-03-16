import User from "@/Models/User";
import mongoose from "mongoose";
import Tweet from "@/Models/Tweet";

const removebookmark = async (req, res) => {
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(401).json({ message: "No Data in Req" });
    }
    const { email, _id } = req.body;
    if (!email) return res.status(401).json({ message: "no email found" });
    if (!_id) return res.status(401).json({ message: "no tweet found" });

    try {
      await mongoose.connect(process.env.MONGO_URI);
      const tweetIndb = await Tweet.findById(mongoose.Types.ObjectId(_id));
      const user = await User.findOne({ email: email });

      if (!tweetIndb)
        return res.status(401).json({ message: "tweet does not exist" });

      if (!user) return res.status(401).json({ message: "no user found" });

      const NoTweetFound = user.bookmarks.find(
        (ele) => ele.toString() === tweetIndb._id.toString()
      );

      if (!NoTweetFound) {
        return res
          .status(200)
          .json({ message: "Tweet not bookmarked the tweet" });
      }

      const newArray = user.bookmarks.filter(
        (ele) => ele.toString() !== tweetIndb._id.toString()
      );

      user.bookmarks = [...newArray];

      await user.save();

      return res.status(200).json({ message: "Successful" });
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(405).json({ message: "Invalid req type" });
  }
};

export default removebookmark;
