import User from "@/Models/User";
import mongoose from "mongoose";
import Tweet from "@/Models/Tweet";

const deletecomment = async (req, res) => {
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(401).json({ message: "No Data in Req" });
    }

    const { tweetId, _id } = req.body;

    if (!tweetId) return res.json({ message: "No tweet found" });
    if (!_id) return res.json({ message: "No id found" });

    const tweetIndb = await Tweet.findById(tweetId);
    const newArrOfComments = tweetIndb.comments.filter(
      (ele) => ele._id.toString() !== _id.toString()
    );
    tweetIndb.comments = newArrOfComments;
    await tweetIndb.save();
    // const replyToUserEmail = await User.findById(tweetIndb.user);

    // tweetIndb.comments.push({
    //   userEmail: req.body.userLoggedIn.user.email,
    //   name: req.body.userLoggedIn.user.name,
    //   replyTo: replyToUserEmail.email,
    //   comment: req.body.comment,
    // });

    // await tweetIndb.save();

    res.json({ message: "successfully deleted comment" });
  } else {
    return res.status(405).json({ message: "Invalid req type" });
  }
};

export default deletecomment;
