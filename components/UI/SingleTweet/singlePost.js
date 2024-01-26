import React from "react";
import { BsThreeDots, BsFillBookmarkFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { BiBookmark } from "react-icons/bi";
import {
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiFillHeart,
  AiOutlineDelete,
} from "react-icons/ai";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import { tweetActions } from "@/store/tweetSlice";
import { useDispatch } from "react-redux";
import ComfirmDelModal from "../Modal/ConfirmDelModal";
import moment from "moment";

const SingleTweet = (props) => {
  const dispatch = useDispatch();
  let base64String
  if(props.image) base64String = Buffer.from(props.image, 'binary').toString('base64');

  const { data: session } = useSession();
  const [bookMark, setBookMark] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [isModal, setModal] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes.length);
  const [isDelModal, setIsDelModal] = useState(false);
  
  const addCommentHandler = () => {
    if (CheckSigned()) setModal(true);
  };

  const removeModal = () => {
    setModal(false);
  };

  const removeDelModal = () => {
    setIsDelModal(false)
  }
  useEffect(() => {
    const run = async () => {
      const userData = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/getuser`,
        {
          email: session.user.email,
        }
      );
      const { data: user } = userData;
      if (user.tweets.find((ele) => ele === props._id)) {
        setDelete(true);
      }
      if (
        user.bookmarks.length > 0 &&
        session &&
        user.bookmarks.find((ele) => ele === props._id)
      ) {
        setBookMark(true);
      }
    };
    if (session) run();
  }, [props._id, session]);

  let isLiked = false;
  if (
    props.likes.length > 0 &&
    session &&
    props.likes.find((ele) => ele === session.user.email)
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
  
  const dateTime = moment.utc(props.time).add(5, 'hours').add(30, 'minutes')
  const time = dateTime.format("h:mm A");
  const month = dateTime.format("MMM");
  const date = dateTime.format("D");

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
        dispatch(
          tweetActions.addLike({
            tweetId: props._id,
            email: session.user.email,
          })
        );
      }
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
        dispatch(
          tweetActions.removeLike({
            tweetId: props._id,
            email: session.user.email,
          })
        );
      }
    }
  };

  const deleteTweet = async () => {
    if (CheckSigned()) {
      setIsDelModal(true)
      // const res = await axios.post(
      //   `${process.env.NEXT_PUBLIC_HOST}/api/deletetweet`,
      //   {
      //     _id: props._id,
      //     email: session.user.email,
      //   }
      // );
      // if (res.statusText === "OK") {
      //   Router.push("/");
      // }
    }
  };

  return (
    <>
      {isModal && <Modal details={props} removeModal={removeModal} />}
      {isDelModal && <ComfirmDelModal deltype="post" post_id={props._id} removeDelModal={removeDelModal}/>}
      <div className="flex flex-col py-2 px-4 w-full h-max border-b-2 border-neutral-900">
        <div className="flex py-2">
          <div className="w-fit h-max p-2">
            {props.profile_picture ? (
              <img
                src={props.profile_picture}
                alt="Avatar"
                style={{
                  verticalAlign: "middle",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  margin: "5px",
                }}
              ></img>
            ) : (
              <img
                src={
                  "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
                }
                alt="Avatar"
                style={{
                  verticalAlign: "middle",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  margin: "5px",
                }}
              ></img>
            )}
          </div>
          <div className="flex justify-between h-16 py-2">
            <div className="px-2">
              <div className="font-bold">{props.name}</div>{" "}
              <div className="font-medium text-neutral-600">
                @{props.username}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          {props.content !== null && (
            <div className="px-2 py-3 text-lg font-semibold">
              {props.content}
            </div>
          )}
          {props.image && (
            <img
              style={{
                maxWidth: "100%",
                borderRadius: "15px",
                border: "1px solid white",
                margin: "15px 0px",
              }}
              src={`data:image/png;base64,${base64String}`}
              alt=""
            />
          )}
          <span className="font-medium text-neutral-600 px-2 pb-2 border-b-2 border-neutral-900">
            {time} · {date} {month}
          </span>
          <div className="flex justify-between px-8 pt-3 pb-1">
            <div>
              <FaRegComment
                onClick={addCommentHandler}
                size={22}
                className="text-neutral-600 inline pb-1 hover:scale-110 cursor-pointer"
              />
              <span className="px-1 text-neutral-500 ">
                {props.comments.length}
              </span>
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
            {isDelete && (
              <button onClick={deleteTweet}>
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
                  className="text-neutral-600 hover:scale-110"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTweet;
