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

const Post = (props) => {
  const { data: session } = useSession();
  const [bookMark, setBookMark] = useState(false);
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

  const [isModal, setModal] = useState(false);

  const addCommentHandler = () => {
    if (CheckSigned()) setModal(true);
  };

  const removeModal = () => {
    setModal(false);
  };

  const addToLikeHandler = async () => {
    if (CheckSigned()) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/addLike`,
        {
          _id: props._id,
          email: session.user.email,
        }
      );
      if (response.statusText === "OK") {
        setLikeButton(true);
        setLikeCount(likeCount + 1);
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
      if (response.statusText === "OK") setBookMark(true);
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
      if (response.statusText === "OK") setBookMark(false);
    }
  };

  const removeLikeHandler = async () => {
    if (CheckSigned()) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/removeLike`,
        {
          _id: props._id,
          email: session.user.email,
        }
      );
      console.log(response);
      if (response.statusText === "OK") {
        setLikeButton(false);
        setLikeCount(likeCount - 1);
      }
    }
  };

  return (
    <>
      {isModal && <Modal details={props} removeModal={removeModal} />}
      <div className="flex py-2 pl-2 pr-4 w-full h-max border-b-2 boorder-r-2 border-neutral-900">
        <div className="w-fit h-max p-2">
          <div className="w-12 h-12 rounded-full bg-neutral-700"></div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <div className="px-2">
              <span className="font-bold">{props.name}</span>{" "}
              <span className="font-medium text-neutral-600">
                @{props.username} ·
              </span>
              <span className="font-medium text-neutral-600 px-1">
                {month} {day}
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
