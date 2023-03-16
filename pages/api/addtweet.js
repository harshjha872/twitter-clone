import User from "@/Models/User";
import mongoose from "mongoose";
import Tweet from "@/Models/Tweet";

const addtweet = async (req, res) => {
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(401).json({ message: "No Data in Req" });
    }
    const { tweet, email } = req.body;
    if (!email) return res.status(401).json({ message: "no email found" });
    if (!tweet) return res.status(401).json({ message: "no tweet found" });

    try {
      await mongoose.connect(process.env.MONGO_URI);
      const user = await User.findOne({ email: email }).exec();
      if (!user)
        return res.status(401).json({ message: "User does not exist" });

      let newtweet = new Tweet({
        user: user._id,
        postedTime: new Date().toDateString().slice(0, 10),
        content: tweet,
        shareLink: `${process.env.NEXT_PUBLIC_HOST}/onepost`,
      });

      await newtweet.save();

      user.tweets.push(newtweet);
      await user.save();

      return res.status(200).json({ message: "Successful" });
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(405).json({ message: "Invalid req type" });
  }
};

export default addtweet;
