import User from "@/Models/User";
import mongoose from "mongoose";
import Tweet from "@/Models/Tweet";

const removeLikeFromComment = async (req, res) => {
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(401).json({ message: "No Data in Req" });
    }
    const { email, _id } = req.body;
    if (!email) return res.status(401).json({ message: "no email found" });
    if (!_id) return res.status(401).json({ message: "no tweet found" });

    try {
      await mongoose.connect(process.env.MONGO_URI);
      const tweetToAdd = await Tweet.findOne({ "comments._id": _id });

      const comment = tweetToAdd.comments.find(
        (ele) => ele._id.toString() === _id.toString()
      );

      const newLikes = comment.likes.filter((ele) => ele !== email);

      comment.likes = [...newLikes];

      await tweetToAdd.save();

      return res.status(200).json({ message: "Successful" });
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(405).json({ message: "Invalid req type" });
  }
};

export default removeLikeFromComment;
