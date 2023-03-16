import Connectmongo from "@/middlewares/db";
import Tweet from "@/Models/Tweet";
import User from "@/Models/User";

const feed = async (req, res) => {
  await Connectmongo();
  const data = await Tweet.find({});

  const responseData = [];

  for (let i = 0; i < data.length; i++) {
    let user = await User.findById(data[i].user);
    const LikedTweetAccounts = [];
    for (let j = 0; j < data[i].likes.length; j++) {
      let currentUser = await User.findById(data[i].likes[j]);
      LikedTweetAccounts.push(currentUser.email);
    }
    let Tweetinfo = {
      name: user.name,
      email: user.email,
      tweet: data[i].content,
      createdAt: data[i].createdAt,
      likes: LikedTweetAccounts,
      shareLink: data[i].shareLink,
      comments: data[i].comments,
      _id: data[i]._id,
    };
    responseData.push(Tweetinfo);
  }
  res.json(responseData);
};

export default feed;
