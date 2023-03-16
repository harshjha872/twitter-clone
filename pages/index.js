import Head from "next/head";
import { BsTwitter } from "react-icons/bs";
import { useState } from "react";
import Post from "@/components/UI/MainFeed/post";
import Sidebar from "@/components/UI/SideBar/sidebar";
import ComposeTweet from "@/components/UI/CreateTweet/compose";
import Sidefeed from "@/components/UI/SideFeed/Sidefeed";
import { GiHamburgerMenu } from "react-icons/gi";
import Overlay from "@/components/UI/SideBar/Overlay";
import PhoneSidebar from "@/components/UI/SideBar/PhoneSidebar";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    let temp = [];
    const findAllTweets = async () => {
      const alltweets = await axios.get("http://localhost:3000/api/feed");
      for (let i = alltweets.data.length - 1; i >= 0; i--) {
        temp.push(
          <Post
            _id={alltweets.data[i]._id}
            name={alltweets.data[i].name}
            likes={alltweets.data[i].likes}
            comments={alltweets.data[i].comments.length}
            content={alltweets.data[i].tweet}
            username={alltweets.data[i].email.split("@")[0]}
            time={alltweets.data[i].createdAt}
            isComment={false}
          />
        );
      }
      setContent([...temp]);
    };
    findAllTweets();
  }, []);

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
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex mx-auto">
        <Sidebar />
        <PhoneSidebar classes={HamClass} />
        {Hamishidden && <Overlay onClickHandler={HamClickHandler} />}
        <div className="min-h-[100vh] grow lg:min-w-[625px] max-w-[625px] flex flex-col min-[500px]:ml-20 xl:ml-80 border-r-2 border-neutral-900 ">
          <div className="min-[500px]:block hidden px-4 py-2 font-bold">
            Home
          </div>
          <div
            onClick={HamClickHandler}
            className=" min-[500px]:hidden block w-fit h-max p-2 fixed top-4 left-2 z-10"
          >
            {/* <div className="w-10 h-10 rounded-full bg-neutral-700"></div> */}
            <GiHamburgerMenu size={24} />
          </div>
          <div
            className="flex min-[500px]:hidden justify-center
         w-full py-6 text-sky-500 fixed top-0 backdrop-blur-md bg-black/30"
          >
            <BsTwitter size={24} />
          </div>
          <div className="flex w-full border-b-2 border-neutral-900 mt-[70px] min-[500px]:mt-0">
            <a onClick={activeOn} className={NavigationClass}>
              <span className={Bottomborder}>For you</span>
            </a>
            <a onClick={activeOff} className={NavigationClass2}>
              <span className={Bottomborder2}>Followings</span>
            </a>
          </div>
          <ComposeTweet />
          {content}
        </div>
        <Sidefeed />
      </main>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const result = await fetch(
//     "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json"
//   );
//   console.log(result);
//   return {
//     props: {
//       news: result,
//     }, // will be passed to the page component as props
//   };
// }