import React from "react";
import { FiImage } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Router from "next/router";

const Modal = (props) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");

  const CloseModal = () => {
    props.removeModal();
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/api/addComment`,
      {
        ...props.details,
        userLoggedIn: {
          user: session.user,
        },
        comment: comment,
      }
    );

    if (response.data.message === "Successful") {
      props.removeModal();
      Router.push(`/tweet/${props.details._id}`);
    }
  };

  const trackComment = (e) => {
    setComment(e.target.value);
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
  const currentTime = props.details.time.split("T")[0];
  const time = currentTime.split("-");
  const day = time[2];
  const month = months[Number(time[1]) - 1];

  return (
    <>
      <div
        onClick={CloseModal}
        className="h-screen w-full fixed inset-0 z-10 bg-blue-900 bg-opacity-50 overscroll-none opacity-50"
      ></div>
      <div className="flex justify-center fixed top-20 left-0 h-screen z-20 w-screen">
        <div className="h-fit w-[600px] mx-8 rounded-2xl border shadow-md bg-black relative">
          <div className="w-full h-12 flex">
            <div
              onClick={CloseModal}
              className="w-max h-max rounded-full cursor-pointer transition duration-200 ease-linear hover:bg-neutral-900 p-2 ml-2 mt-2"
            >
              <RxCross1 size={19} />
            </div>
          </div>
          <div className="h-fit w-full px-[9px] flex relative">
            <div className="w-fit h-max p-2 z-40">
              <div className="w-12 h-12 rounded-full bg-neutral-700"></div>
            </div>
            <div className="font-semibold pr-2 pt-2">{props.details.name} </div>
            <div className="font-medium text-neutral-600 pr-2 pt-2">
              @{props.details.username}
            </div>
            <div className="font-medium text-neutral-600 pt-2 pr-2">·</div>
            <div className="font-medium text-neutral-600 pt-2">
              {month} {day}
            </div>
          </div>
          <span className="w-0.5 h-[89px] z-30 absolute left-10 top-15 mt-[-4px] bg-neutral-500" />
          <div className="px-16 h-fit text-neutral-400">
            {props.details.content}
          </div>
          <div className="px-16 pt-4 h-fit font-light text-neutral-400">
            Replying to{" "}
            <span className="text-sky-500">@{props.details.username}</span>
          </div>
          {/* compose */}
          <div className="flex px-[9px] py-2">
            <div className="w-fit h-max p-2 z-40">
              <div className="w-12 h-12 rounded-full bg-neutral-700"></div>
            </div>
            <form onSubmit={addCommentHandler} className="flex flex-col w-full">
              <textarea
                onChange={trackComment}
                value={comment}
                id="message"
                rows="4"
                className="resize-none focus:outline-none focus:ring-0  block p-2.5 w-full text-lg font-semibold text-neutral-100 bg-black rounded-lg"
                placeholder="What's happening?"
              ></textarea>
              <div className="flex h-fit py-4 px-4 justify-between items-center">
                <FiImage
                  size={18}
                  className="text-sky-500 cursor-pointer hover:scale-105"
                />
                <button
                  type="submit"
                  className="bg-sky-600 rounded-2xl w-20 h-8 font-semibold px-2 text-center flex justify-center items-center"
                >
                  Reply
                </button>
              </div>
            </form>
          </div>
          {/* <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" /> */}
        </div>
      </div>
    </>
  );
};

export default Modal;
