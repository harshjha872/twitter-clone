import React, { useEffect } from "react";
import Link from "next/link";
import { FaRegComment } from "react-icons/fa";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BiBookmark } from "react-icons/bi";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Router from "next/router";

const SingleComment = (props) => {
  const { data: session } = useSession();
  const [likeCount, setLikeCount] = useState(props.comments.likes.length);
  const [isDelete, setDelete] = useState(false);

  useEffect(() => {
    const run = async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/getuser`,
        {
          email: session.user.email,
        }
      );
      if (response.data.email === props.comments.userEmail) setDelete(true);
    };
    if (session) run();
  }, [session, props.comments.userEmail]);

  let isLiked = false;

  if (
    props.comments.likes.length > 0 &&
    session &&
    props.comments.likes.find((ele) => ele === session.user.email)
  ) {
    isLiked = true;
  }
  const [likeButton, setLikeButton] = useState(isLiked);
  const CheckSigned = () => {
    if (!session) {
      Router.push("/auth/signin");
      return false;
    }
    return true;
  };
  const addLikeToCommandHandler = async () => {
    if (CheckSigned()) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/addLikeToComment`,
        {
          _id: props.comments._id,
          email: session.user.email,
        }
      );
      if (response.statusText === "OK") {
        setLikeButton(true);
        setLikeCount(likeCount + 1);
      }
    }
  };

  const removeLikeFromCommentHandler = async () => {
    if (CheckSigned()) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/removeLikeFromComment`,
        {
          _id: props.comments._id,
          email: session.user.email,
        }
      );
      if (response.statusText === "OK") {
        setLikeButton(false);
        setLikeCount(likeCount - 1);
      }
    }
  };

  const deletecomment = async () => {
    if (CheckSigned()) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/deletecomment`,
        {
          tweetId: props.tweet,
          _id: props.comments._id,
        }
      );
      if (res.statusText === "OK") {
        Router.push("/");
      }
    }
  };

  return (
    <div className="flex py-2 pl-2 pr-4 w-full h-max border-b-2 border-neutral-900">
      <div className="w-fit h-max p-2">
        <div className="w-12 h-12 rounded-full bg-neutral-700"></div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <div className="px-2">
            <span className="font-bold">{props.comments.name}</span>{" "}
            <span className="font-medium text-neutral-600">
              @{props.comments.userEmail.split("@")[0]} ·
            </span>
            <span className="font-medium text-neutral-600 px-1">Feb 25</span>
          </div>
        </div>
        <div className="text-neutral-600 px-2">
          {" "}
          Replying to{" "}
          <span className="text-sky-500 font-light">
            @{props.comments.replyTo.split("@")[0]}
          </span>
        </div>
        <div className="px-2 pt-1">{props.comments.comment}</div>
        <div className="flex justify-between px-2 pt-2">
          <div>
            <FaRegComment
              size={22}
              className="text-neutral-600 inline pb-1 hover:scale-110 cursor-pointer"
            />
          </div>
          <div>
            {likeButton ? (
              <AiFillHeart
                onClick={removeLikeFromCommentHandler}
                size={22}
                className="inline pb-1 hover:scale-110 "
              />
            ) : (
              <AiOutlineHeart
                onClick={addLikeToCommandHandler}
                size={22}
                className="text-neutral-600 inline pb-1 hover:scale-110 cursor-pointer"
              />
            )}

            <span className="px-1 text-neutral-500">{likeCount}</span>
          </div>
          {isDelete && (
            <button onClick={deletecomment}>
              <AiOutlineDelete
                size={20}
                className="text-neutral-600 hover:scale-110 "
              />
            </button>
          )}
          <button>
            <AiOutlineShareAlt
              size={20}
              className="text-neutral-600 hover:scale-110 "
            />
          </button>
          <button>
            <BiBookmark
              size={20}
              className="text-neutral-600 hover:scale-110 "
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;

//////////////////////////////////////////////////////////////////////

// import React from "react";
// import { BsThreeDots, BsFillBookmarkFill } from "react-icons/bs";
// import { FaRegComment } from "react-icons/fa";
// import { BiBookmark } from "react-icons/bi";
// import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai";
// import { useSession } from "next-auth/react";
// import Router from "next/router";
// import { useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import Modal from "../Modal/Modal";

// const Post = (props) => {
//   const { data: session } = useSession();
//   let isLiked = false;
//   if (
//     props.likes.length > 0 &&
//     session &&
//     props.likes.find((ele) => ele === session.user.email)
//   ) {
//     isLiked = true;
//   }
//   const [likeButton, setLikeButton] = useState(isLiked);
//   const [bookMark, setBookMark] = useState(false);
//   const CheckSigned = () => {
//     if (!session) {
//       Router.push("/auth/signin");
//       return false;
//     }
//     console.log(session);
//     return true;
//   };
//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "June",
//     "July",
//     "Aug",
//     "Sept",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//   const currentTime = props.time.split("T")[0];
//   const time = currentTime.split("-");
//   const day = time[2];
//   const month = months[Number(time[1]) - 1];

//   const [isModal, setModal] = useState(false);
//   const addCommentHandler = () => {
//     setModal(!isModal);
//   };

//   const addToLikeHandler = async () => {
//     if (CheckSigned()) {
//       const response = await axios.post("http://localhost:3000/api/addLike", {
//         _id: props._id,
//         email: session.user.email,
//       });
//       if (response.statusText === "OK") setLikeButton(true);
//     }
//   };

//   const removeLikeHandler = async () => {
//     if (CheckSigned()) {
//       const response = await axios.post(
//         "http://localhost:3000/api/removeLike",
//         {
//           _id: props._id,
//           email: session.user.email,
//         }
//       );
//       if (response.statusText === "OK") setLikeButton(false);
//     }
//   };

//   return (
//     <>
//       {isModal && <Modal details={props} />}
//       <div className="flex py-2 pl-2 pr-4 w-full h-max border-b-2 border-neutral-900">
//         <div className="w-fit h-max p-2">
//           <div className="w-12 h-12 rounded-full bg-neutral-700"></div>
//         </div>
//         <div className="flex flex-col w-full">
//           <div className="flex justify-between">
//             <div className="px-2">
//               <span className="font-bold">{props.name}</span>{" "}
//               <span className="font-medium text-neutral-600">
//                 @{props.username} ·
//               </span>
//               <span className="font-medium text-neutral-600 px-1">
//                 {month} {day}
//               </span>
//             </div>
//             {!props.isComment && (
//               <Link href={`/tweet/${props._id}`}>
//                 <div>
//                   <BsThreeDots className="mt-1 text-neutral-600 hover:scale-110 cursor-pointer" />
//                 </div>
//               </Link>
//             )}
//           </div>
//           <div className="px-2 pt-1">{props.content}</div>
//           <div className="flex justify-between px-2 pt-2">
//             <div>
//               <FaRegComment
//                 onClick={addCommentHandler}
//                 size={22}
//                 className="text-neutral-600 inline pb-1 hover:scale-110 cursor-pointer"
//               />
//               <span className="px-1 text-neutral-500 ">{props.comments}</span>
//             </div>
//             <div>
//               {likeButton ? (
//                 <AiFillHeart
//                   onClick={removeLikeHandler}
//                   size={22}
//                   className="inline pb-1 hover:scale-110 "
//                 />
//               ) : (
//                 <AiOutlineHeart
//                   onClick={addToLikeHandler}
//                   size={22}
//                   className="text-neutral-600 inline pb-1 hover:scale-110 cursor-pointer"
//                 />
//               )}

//               <span className="px-1 text-neutral-500">
//                 {props.likes.length}
//               </span>
//             </div>
//             <button>
//               <AiOutlineShareAlt
//                 size={20}
//                 className="text-neutral-600 hover:scale-110 "
//               />
//             </button>
//             <button>
//               {bookMark ? (
//                 <BsFillBookmarkFill
//                   onClick={() => setBookMark(false)}
//                   size={20}
//                   className="hover:scale-110 "
//                 />
//               ) : (
//                 <BiBookmark
//                   onClick={() => {
//                     if (CheckSigned()) setBookMark(true);
//                   }}
//                   size={20}
//                   className="text-neutral-600 hover:scale-110 "
//                 />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Post;
