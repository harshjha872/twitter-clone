import React from "react";
import { FiImage } from "react-icons/fi";
import Router from "next/router";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { UseSelector, useDispatch } from "react-redux";
import { tweetActions } from "@/store/tweetSlice";
const ComposeTweet = () => {
  const { data: session, status } = useSession();

  const dispatch = useDispatch()
  
  const [tweet, setTweet] = useState("");
  const [image, setImage] = useState()
  const [displayImage, setDisplayImage] = useState()

  const textareaChangeHandler = (e) => {
    setTweet(e.target.value);
  };

  const tweetSubmit = async (e) => {
    e.preventDefault();

    if (tweet === "" && !image) {
      console.log("No tweet or image found");
      return;
    }
    
    const formData = new FormData()

    if(image) formData.append('file', image)      
    if(tweet) formData.append('tweet', tweet)
    
    formData.append('email', session.user.email)

    if (status === "authenticated") {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/addtweet`,formData);
        
      console.log(response)
      if(response.data.message === "Successfull") {
        dispatch(tweetActions.addTweets(response.data.tweetDetails))
      }
      setTweet("");
      setImage(null)
      setDisplayImage(null)
    } else {
      Router.push("/auth/signin");
    }
  };

  const CheckSigned = () => {
    if (!session) {
      Router.push("/auth/signin");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      setImage(file);
      setDisplayImage(URL.createObjectURL(file))
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
        
         {displayImage && <img src={displayImage} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: '15px', border: '1px solid white' }} />}
        
        <div className="flex h-fit py-4 px-4 justify-between items-center">
          <label htmlFor="fileInput"> 
          <FiImage
            size={18}
            className="text-sky-500 cursor-pointer hover:scale-105"
          />
           </label>
          <input type="file" accept="image/*" onChange={handleImageChange} id="fileInput" style={{ display: 'none'}}></input>
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
