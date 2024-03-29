import React from "react";
import { BsThreeDots, BsFillBookmarkFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { BiBookmark } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { tweetActions } from "@/store/tweetSlice";
import moment from "moment";

const Post = (props) => {
  const { data: session } = useSession();

  const dispatch = useDispatch();

  let base64String
  if(props.image) base64String = Buffer.from(props.image, 'binary').toString('base64');

  const [bookMark, setBookMark] = useState(false);
  const [likeButton, setLikeButton] = useState(props.likes.length > 0 && session &&
    props.likes.find((ele) => ele === session.user.email) ? true : false);
  
  const [likeCount, setLikeCount] = useState(props.likes.length);
  
  useEffect(() => {
    const run = async () => {
      const userData = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/getuser`,
        {
          email: session.user.email,
        }
      );
      const { data: user } = userData;
      if (
        user.bookmarks?.length > 0 &&
        session &&
        user.bookmarks.find((ele) => ele === props._id)
      ) {
        setBookMark(true);
      }
    };
    if (session) run();
  }, [props._id, session]);

  const CheckSigned = () => {
    if (!session) {
      Router.push("/auth/signin");
      return false;
    }
    return true;
  };

  const dateTime = moment.utc(props.time).add(5, 'hours').add(30, 'minutes')
  const month = dateTime.format("MMM");
  const date = dateTime.format("D");
  
  const [isModal, setModal] = useState(false);

  const addCommentHandler = () => {
    if (CheckSigned()) setModal(true);
  };

  const removeModal = () => {
    setModal(false);
  };

  const addToLikeHandler = async () => {
    if (CheckSigned()) {
      setLikeButton(true);
      setLikeCount(likeCount + 1);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/addLike`,
        {
          _id: props._id,
          email: session.user.email,
        }
      );
      if (response.data.message !== "Successful") {
        setLikeButton(false);
        setLikeCount(likeCount - 1);
      } else {
        dispatch(tweetActions.addLike({ tweetId: props._id, email: session.user.email}))
      }
    }
  };

  const addtobookmark = async () => {
    if (CheckSigned()) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/addtobookmark`,
        {
          _id: props._id,
          email: session.user.email,
        }
      );
      if (response.data.message === "Successful") setBookMark(true);
    }
  };

  const removebookmark = async () => {
    if (CheckSigned()) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/removebookmark`,
        {
          _id: props._id,
          email: session.user.email,
        }
      );
      if (response.data.message === "Successful") setBookMark(false);
    }
  };

  const removeLikeHandler = async () => {
    if (CheckSigned()) {
      setLikeButton(false);
      setLikeCount(likeCount - 1);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/removeLike`,
        {
          _id: props._id,
          email: session.user.email,
        }
      );
      if (response.data.message !== "Successful") {
        setLikeButton(true);
        setLikeCount(likeCount + 1);
      } else {
        dispatch(tweetActions.removeLike({ tweetId: props._id, email: session.user.email}))
      }
    }
  };

  return (
    <>
      {isModal && <Modal details={props} removeModal={removeModal} />}
      <div className="flex py-2 pl-2 pr-4 w-full h-max border-b-2 boorder-r-2 border-neutral-900">
        <div className="w-fit h-max" style={{ paddingRight: '5px'}}>
        {props.profile_picture ? (
          <img
            src={props.profile_picture}
            alt="Avatar"
            style={{
              verticalAlign: "middle",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              margin: "5px",
            }}
          ></img>
        ) : (
          <img
            src={'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png'}
            alt="Avatar"
            style={{
              verticalAlign: "middle",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              margin: "5px",
            }}
          ></img>
        )}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <div className="px-2">
              <span className="font-bold">{props.name}</span>{" "}
              <span className="font-medium text-neutral-600">
                @{props.username} ·
              </span>
              <span className="font-medium text-neutral-600 px-1">
                {month} {date}
              </span>
            </div>
            {!props.isComment && (
              <Link href={`/tweet/${props._id}`}>
                <div>
                  <BsThreeDots className="mt-1  hover:scale-110 cursor-pointer" />
                </div>
              </Link>
            )}
          </div>
          <div className="px-2 pt-1">{props.content}</div>
         {props.image && <img style={{ 
              maxWidth: '100%',
              borderRadius: '15px',
              border: '1px solid white',
              marginTop: '15px',
              marginLeft: '7px'
         }} src={`data:image/png;base64,${base64String}`} alt=""/>}
          <div className="flex justify-between px-2 pt-2">
            <div>
              <FaRegComment
                onClick={addCommentHandler}
                size={22}
                className="text-neutral-600 inline pb-1 hover:scale-110 cursor-pointer"
              />
              <span className="px-1 text-neutral-500 ">{props.comments}</span>
            </div>
            <div>
              {likeButton ? (
                <AiFillHeart
                  onClick={removeLikeHandler}
                  size={22}
                  className="inline pb-1 hover:scale-110 "
                />
              ) : (
                <AiOutlineHeart
                  onClick={addToLikeHandler}
                  size={22}
                  className="text-neutral-600 inline pb-1 hover:scale-110 cursor-pointer"
                />
              )}

              <span className="px-1 text-neutral-500">{likeCount}</span>
            </div>
            <button>
              <AiOutlineShareAlt
                size={20}
                className="text-neutral-600 hover:scale-110 "
              />
            </button>
            <button>
              {bookMark ? (
                <BsFillBookmarkFill
                  onClick={removebookmark}
                  size={20}
                  className="hover:scale-110 "
                />
              ) : (
                <BiBookmark
                  onClick={addtobookmark}
                  size={20}
                  className="text-neutral-600 hover:scale-110 "
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
