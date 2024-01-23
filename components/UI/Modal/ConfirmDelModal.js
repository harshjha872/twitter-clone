import React from "react";
import { FiImage } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { tweetActions } from "@/store/tweetSlice";
import { useDispatch } from "react-redux";

const ComfirmDelModal = (props) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [comment, setComment] = useState("");

  const CloseModal = () => {
    props.removeDelModal();
  };

  const CheckSigned = () => {
    if (!session) {
      Router.push("/auth/signin");
      return false;
    }
    return true;
  };

  const deleteTweet = async () => {
    if (CheckSigned()) {
        if(props.deltype === 'post') {
            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_HOST}/api/deletetweet`,
              {
                _id: props.post_id,
                email: session.user.email,
              }
            );
            if (res.statusText === "OK") {
                Router.push("/");
            }
        } else if(props.deltype === 'comment') {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_HOST}/api/deletecomment`,
                {
                  tweetId: props.post_id,
                  _id: props.comment_id,
                }
              );
              if (res.statusText === "OK") {
                dispatch(tweetActions.deleteComment({ tweetId: props.post_id, email: session.user.email, commentId: props.comment_id }))
                // Router.push("/");
              }
        }
        props.removeDelModal();
    }
  };

  return (
    <>
      <div
        onClick={CloseModal}
        className="h-screen w-full fixed inset-0 z-10 bg-[#000000fa] bg-opacity-50 overscroll-none opacity-50"
      ></div>
      <div className="flex justify-center top-0 left-0 items-center fixed h-screen z-20 w-screen">
        <div className="h-fit w-[400px] mx-8 rounded-2xl pb-1 border border-neutral-700  shadow-md bg-neutral-900 relative">
          <div className="w-full h-fit flex justify-end">
            <div
              onClick={CloseModal}
              className="w-max h-max rounded-full cursor-pointer transition duration-200 ease-linear hover:bg-neutral-900 mr-3 mt-3"
            >
              <RxCross1 size={19} />
            </div>
          </div>
          <div className="h-fit w-full flex relative">
            <div className="font-semibold py-4 px-2 m-auto text-lg">
              Are you sure you want to delete?{" "}
            </div>
          </div>
          <div className="flex space-x-4 px-3 pt-2 pb-8 justify-center">
            <button
              onClick={CloseModal}
              className="bg-sky-600 rounded-lg w-20 h-8 font-semibold px-2 text-center flex justify-center items-center"
            >
              No
            </button>
            <button
            onClick={deleteTweet} className="bg-sky-600 rounded-lg w-20 h-8 font-semibold px-2 text-center flex justify-center items-center">
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComfirmDelModal;
