import User from "@/Models/User";
import mongoose from "mongoose";
import Tweet from "@/Models/Tweet";

const removeLike = async (req, res) => {
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

      const NoUserPresent = tweetIndb.likes.find(
        (ele) => ele.toString() === user._id.toString()
      );

      if (!NoUserPresent) {
        return res.status(200).json({ message: "User not liked the tweet" });
      }

      const newArray = tweetIndb.likes.filter(
        (ele) => ele.toString() !== user._id.toString()
      );

      tweetIndb.likes = [...newArray];

      await tweetIndb.save();

      return res.status(200).json({ message: "Successful" });
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(405).json({ message: "Invalid req type" });
  }
};

export default removeLike;
