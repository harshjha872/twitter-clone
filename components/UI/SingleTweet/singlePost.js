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
import getuser from "@/helpers/getUser";
import Modal from "../Modal/Modal";

const SingleTweet = (props) => {
  const { data: session } = useSession();
  const [bookMark, setBookMark] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [isModal, setModal] = useState(false);

  const addCommentHandler = () => {
    if (CheckSigned()) setModal(true);
  };

  const removeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    const run = async () => {
      let user = await getuser(session.user.email);
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
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentTime = props.time.split("T")[0];
  const time = currentTime.split("-");
  const day = time[2];
  const month = months[Number(time[1]) - 1];

  const addtobookmark = async () => {
    if (CheckSigned()) {
      const response = await axios.post(
        "http://localhost:3000/api/addtobookmark",
        {
          _id: props._id,
          email: session.user.email,
        }
      );
      if (response.statusText === "OK") setBookMark(true);
    }
  };

  const removebookmark = async () => {
    if (CheckSigned()) {
      const response = await axios.post(
        "http://localhost:3000/api/removebookmark",
        {
          _id: props._id,
          email: session.user.email,
        }
      );
      if (response.statusText === "OK") setBookMark(false);
    }
  };

  const addToLikeHandler = async () => {
    if (CheckSigned()) {
      const response = await axios.post("http://localhost:3000/api/addLike", {
        _id: props._id,
        email: session.user.email,
      });
      if (response.statusText === "OK") setLikeButton(true);
    }
  };

  const removeLikeHandler = async () => {
    if (CheckSigned()) {
      const response = await axios.post(
        "http://localhost:3000/api/removeLike",
        {
          _id: props._id,
          email: session.user.email,
        }
      );
      if (response.statusText === "OK") setLikeButton(false);
    }
  };

  const deleteTweet = async () => {
    if (CheckSigned()) {
      const res = await axios.post("http://localhost:3000/api/deletetweet", {
        _id: props._id,
        email: session.user.email,
      });
      if (res.statusText === "OK") {
        Router.push("/");
      }
    }
  };

  return (
    <>
      {isModal && <Modal details={props} removeModal={removeModal} />}
      <div className="flex flex-col py-2 pl-2 pr-4 w-full h-max border-b-2 border-neutral-900">
        <div className="flex py-2">
          <div className="w-fit h-max p-2">
            <div className="w-12 h-12 rounded-full bg-neutral-700"></div>
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
          <div className="px-2 py-3 text-lg font-semibold">{props.content}</div>
          <span className="font-medium text-neutral-600 px-2 pb-2 border-b-2 border-neutral-900">
            1:40 PM · {month} {day}
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

              <span className="px-1 text-neutral-500">
                {props.likes.length}
              </span>
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
