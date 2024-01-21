import Head from "next/head";
import { useState } from "react";
import Post from "@/components/UI/MainFeed/post";
import Sidebar from "@/components/UI/SideBar/sidebar";
import Sidefeed from "@/components/UI/SideFeed/Sidefeed";
import { GiHamburgerMenu } from "react-icons/gi";
import Overlay from "@/components/UI/SideBar/Overlay";
import PhoneSidebar from "@/components/UI/SideBar/PhoneSidebar";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SingleTweet from "../../components/UI/SingleTweet/singlePost";
import SingleComment from "@/components/UI/Comment/SingleComment";
import { useSelector } from "react-redux";

export default function Home() {
  const [content, setContent] = useState([]);
  const [comData, setComData] = useState([]);
  
  const router = useRouter();
  const { slug } = router.query;
  const currentTweet = useSelector(state => state.tweetsSlice.tweets.find(tweet => tweet._id === slug));

  useEffect(() => {
    if (!router.isReady) return;
    let temp = [];
    let commentsArr = [];
    const findTweet = async () => {
      const tweet = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/gettweet`,
        {
          _id: slug,
        }
      );
      let imageBuffer;
      if(Object.keys(tweet.data[0].image).length !== 0) {
        imageBuffer = tweet.data[0].image.data.data
      }
      temp.push(
        <SingleTweet
          _id={tweet.data[0]._id}
          name={tweet.data[0].name}
          likes={tweet.data[0].likes}
          comments={tweet.data[0].comments}
          content={tweet.data[0].tweet}
          username={tweet.data[0].email.split("@")[0]}
          email={tweet.data[0].email}
          time={tweet.data[0].createdAt}
          image={imageBuffer}
          profile_picture={tweet.data[0].profile_picture}
        />
      );

      for (let i = 0; i < tweet.data[0].comments.length; i++) {
        commentsArr.push(
          <SingleComment comments={tweet.data[0].comments[i]} tweet={slug} />
        );
      }

      setComData([...commentsArr]);
      setContent([...temp]);
    };

    if(!currentTweet) findTweet();
    else {
      let commentsArr = [];
      setContent(<SingleTweet
        _id={currentTweet._id}
        name={currentTweet.name}
        likes={currentTweet.likes}
        comments={currentTweet.comments}
        content={currentTweet.tweet}
        username={currentTweet.email.split("@")[0]}
        email={currentTweet.email}
        time={currentTweet.createdAt}
        image={currentTweet.image.data}
        profile_picture={currentTweet.profile_picture}
      />)
      for (let i = 0; i < currentTweet.comments.length; i++) {
        commentsArr.push(
          <SingleComment comments={currentTweet.comments[i]} tweet={slug} />
        );
      }
      setComData([...commentsArr]);
    }
  }, [slug, router.isReady, currentTweet]);

  const [active, setActiveState] = useState(true);
  const [Hamishidden, setHamIsHidden] = useState(false);

  let HamClass = `min-[500px]:hidden z-20 ease-in-out transition duration-200 bg-neutral-900 flex space-y-2 flex-col h-screen w-20 w-72 fixed left-0 top-0 border-r-2 border-neutral-900 items-center items-start py-4 ${
    Hamishidden ? "translate-x-0" : "-translate-x-72"
  }`;
  const HamClickHandler = () => {
    setHamIsHidden(!Hamishidden);
  };
  const NavigationClass = `w-1/2 text-center p-4 ${
    active ? "bg-[#121212]" : ""
  }`;
  const Bottomborder = `font-semibold py-3 ${
    active ? "border-b-4 border-sky-500" : ""
  }`;
  const NavigationClass2 = `w-1/2 text-center p-4 ${
    active ? "" : "bg-[#121212]"
  }`;
  const Bottomborder2 = `font-semibold py-3 ${
    active ? "" : "border-b-4 border-sky-500"
  }`;
  const activeOn = () => {
    setActiveState(true);
  };
  const activeOff = () => {
    setActiveState(false);
  };

  return (
    <main className="flex mx-auto">
      <Sidebar />
      <PhoneSidebar classes={HamClass} />
      {Hamishidden && <Overlay onClickHandler={HamClickHandler} />}
      <div className="grow min-h-[100vh] lg:min-w-[625px] max-w-[625px] flex flex-col min-[500px]:ml-20 xl:ml-80 border-neutral-900 border-r-2">
        <div className="px-4 py-2 font-bold border-neutral-900 ">Tweet</div>

        <div className="sm:pt-0">{content}</div>
        <div>{comData}</div>
      </div>
      <Sidefeed />
    </main>
  );
}
