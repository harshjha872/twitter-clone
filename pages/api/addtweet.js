import multer from "multer";
import { createRouter } from "next-connect";
import User from "@/Models/User";
import mongoose from "mongoose";
import Tweet from "@/Models/Tweet";
import fs from 'fs'

const router = createRouter();

export const config = {
    api: {
        bodyParser: false
    }
}

const upload = multer({
    storage:multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "uploads/");
        },
        filename: function(req, file, cb) {
            cb(null, new Date().getTime() + "-" + file.originalname)
        }
    })
})

router
  .use(upload.single("file"))
  .post(async (req, res) => {
    if (!req.body) {
        return res.status(401).json({ message: "No Data in Req" });
      }
      const { tweet, email } = req.body;

      const image = req.file

      if (!email) return res.status(401).json({ message: "no email found" });
      if (!tweet && !image) return res.status(401).json({ message: "no tweet or image found" });
  
      try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email: email }).exec();
        if (!user)
          return res.status(401).json({ message: "User does not exist" });
  
        let uploadedImage;

        if (image) {
          uploadedImage = {
            data: fs.readFileSync('uploads/' + req.file.filename),
            contentType: image.mimetype,
          }
        } 

        const newtweet = new Tweet({
          user: user._id,
          postedTime: new Date().toDateString().slice(0, 10),
          content: tweet || null,
          shareLink: `${process.env.NEXT_PUBLIC_HOST}/onepost`,
          image: uploadedImage
        });

        const savedTweet = await newtweet.save();
  
        user.tweets.push(newtweet);
        await user.save();
  
        return res.status(200).json({ 
          message: "Successfull", 
          tweetDetails: {
            tweet: tweet ? savedTweet.content : null,
            createdAt: savedTweet.createdAt,
            likes: [],
            shareLink: savedTweet.shareLink,
            comments: [],
            image: image ? uploadedImage.data : {},
            _id: savedTweet._id,
            name: user.name,
            email: user.email
          },
          image: image 
        });
      } catch (err) {
        console.log(err);
      }
  })

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});