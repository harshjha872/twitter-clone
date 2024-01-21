import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import User from "@/Models/User";
const CryptoJS = require("crypto-js");

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email: credentials.email }).exec();
        if (!user) throw new Error("no user found");

        if(!user.password) throw new Error("Wrong password");
        else {
          const decryptedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.JWT_SECRET
          ).toString(CryptoJS.enc.Utf8);

          if (credentials.password !== decryptedPassword)
            throw new Error("Wrong password");
        }

        return user;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider === 'google') {
        await mongoose.connect(process.env.MONGO_URI);
        const userInDb = await User.findOne({ email: user.email }).exec();
        if(userInDb) {
          await User.findOneAndUpdate({ email: user.email }, { profile_picture: user.image });
        } else {
          let newuser = new User({
            name: user.name,
            email: user.email,
            profile_picture: user.image,
          });
          await newuser.save();
        }
      }
      return true
    }
 }
}

export default NextAuth(authOptions);
