import React from "react";
import { FiImage } from "react-icons/fi";
import Router from "next/router";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const ComposeTweet = () => {
  const { data: session, status } = useSession();

  const [tweet, setTweet] = useState("");

  const textareaChangeHandler = (e) => {
    setTweet(e.target.value);
  };

  const tweetSubmit = async (e) => {
    e.preventDefault();
    if (tweet === "") {
      console.log("No tweet found");
      return;
    }
    setTweet("");
    if (status === "authenticated") {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/addtweet`,
        {
          tweet: tweet,
          email: session.user.email,
        }
      );
      console.log(response);
    } else {
      Router.push("/auth/signin");
    }
  };

  const CheckSigned = () => {
    if (!session) {
      Router.push("/auth/signin");
    }
  };

  return (
    <div className="hidden min-[500px]:flex p-2 border-b-2 border-neutral-900">
      <div className="w-fit h-max p-2">
        <div className="w-12 h-12 rounded-full bg-neutral-700"></div>
      </div>
      <form onSubmit={tweetSubmit} className="flex flex-col w-full">
        <textarea
          onChange={textareaChangeHandler}
          value={tweet}
          id="message"
          rows="4"
          className="resize-none focus:outline-none focus:ring-0  block p-2.5 w-full text-lg font-semibold text-neutral-100 bg-black rounded-lg"
          placeholder="What's happening?"
        ></textarea>
        <div className="flex h-fit py-4 px-4 justify-between items-center">
          <FiImage
            onClick={CheckSigned}
            size={18}
            className="text-sky-500 cursor-pointer hover:scale-105"
          />
          <button
            type="submit"
            onClick={CheckSigned}
            className="bg-sky-600 rounded-2xl w-20 h-8 font-semibold px-2 text-center flex justify-center items-center"
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComposeTweet;
