import Connectmongo from "@/middlewares/db";
import Tweet from "@/Models/Tweet";
import User from "@/Models/User";

const getbookmarks = async (req, res) => {
  if (req.method === "POST") {
    if (!req.body) res.json({ message: "no body" });

    await Connectmongo();

    const email = req.body.email;

    const user = await User.findOne({ email: email });

    const responseData = [];

    for (let i = 0; i < user.bookmarks.length; i++) {
      const tweetinDb = await Tweet.findById(user.bookmarks[i]);
      const tweetUser = await User.findById(tweetinDb.user);
      let LikedTweetAccounts = [];
      for (let j = 0; j < tweetinDb.likes.length; j++) {
        let currentUser = await User.findById(tweetinDb.likes[j]);
        LikedTweetAccounts.push(currentUser.email);
      }

      let TweetInfo = {
        name: tweetUser.name,
        email: tweetUser.email,
        tweet: tweetinDb.content,
        createdAt: tweetinDb.createdAt,
        likes: LikedTweetAccounts,
        shareLink: tweetinDb.shareLink,
        comments: tweetinDb.comments,
        _id: tweetinDb._id,
        image: tweetinDb.image
      };
      responseData.push(TweetInfo);
    }

    res.json(responseData);
  }
};

export default getbookmarks;
