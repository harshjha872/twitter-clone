import User from "@/Models/User";
import mongoose from "mongoose";
import Tweet from "@/Models/Tweet";

const addComment = async (req, res) => {
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(401).json({ message: "No Data in Req" });
    }

    if (!req.body._id) return res.json({ message: "No id found" });

    await mongoose.connect(process.env.MONGO_URI);
    const tweetIndb = await Tweet.findById(
      mongoose.Types.ObjectId(req.body._id)
    );

    const userLoggedIn = await User.findOne({
      email: req.body.userLoggedIn.user.email,
    });

    if (!tweetIndb) res.json({ message: "no Tweet found" });
    if (!userLoggedIn) res.json({ message: "no user found" });

    const replyToUserEmail = await User.findById(tweetIndb.user);

    tweetIndb.comments.push({
      userEmail: req.body.userLoggedIn.user.email,
      name: req.body.userLoggedIn.user.name,
      replyTo: replyToUserEmail.email,
      comment: req.body.comment,
    });

    await tweetIndb.save();

    res.json({ message: "successfully added comment" });
  } else {
    return res.status(405).json({ message: "Invalid req type" });
  }
};

export default addComment;
