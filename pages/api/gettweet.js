import Connectmongo from "@/middlewares/db";
import Tweet from "@/Models/Tweet";
import User from "@/Models/User";

const getTweet = async (req, res) => {
  if (req.method === "POST") {
    if (!req.body) res.json({ message: "no id found" });
    if (!req.body._id) res.json({ message: "no id found" });
    await Connectmongo();
    const singleTweet = await Tweet.findById(req.body._id);

    const responseData = [];

    let user = await User.findById(singleTweet.user);

    const LikedTweetAccounts = [];

    for (let j = 0; j < singleTweet.likes.length; j++) {
      let currentUser = await User.findById(singleTweet.likes[j]);
      LikedTweetAccounts.push(currentUser.email);
    }

    let Tweetinfo = {
      name: user.name,
      email: user.email,
      tweet: singleTweet.content,
      createdAt: singleTweet.createdAt,
      likes: LikedTweetAccounts,
      shareLink: singleTweet.shareLink,
      comments: singleTweet.comments,
      _id: singleTweet._id,
      image: singleTweet.image,
      profile_picture: user.profile_picture
    };
    responseData.push(Tweetinfo);

    res.json(responseData);
  } else {
    res.json({ message: "wrong req type" });
  }
};

export default getTweet;
