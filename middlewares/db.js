import mongoose from "mongoose";

export default async function Connectmongo() {
  return await mongoose.connect(process.env.MONGO_URI);
}
