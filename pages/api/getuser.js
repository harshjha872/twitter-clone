import Connectmongo from "@/middlewares/db";
import User from "@/Models/User";

const getuser = async (req, res) => {
  if (req.method === "POST") {
    if (!req.body) res.json({ message: "no id found" });
    if (!req.body.email) res.json({ message: "no email found" });
    await Connectmongo();
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ message: "no user found" });
    }

    res.json(user);
  } else {
    res.json({ message: "wrong req type" });
  }
};

export default getuser;
