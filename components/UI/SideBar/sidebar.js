import React from "react";
import { BsTwitter } from "react-icons/bs";
import { RiHome7Fill } from "react-icons/ri";
import { RiNotification3Line } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { BiBookmark } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { FiHash } from "react-icons/fi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";

const Sidebar = () => {
  const { data: session } = useSession();
  const CheckSigned = () => {
    if (!session) {
      Router.push("/auth/signin");
    } else {
      return true;
    }
  };

  const showBookmarks = () => {
    if (CheckSigned()) {
      Router.push("/bookmarks");
    }
  };

  return (
    <div className="hidden min-[500px]:flex space-y-2 min-[500px]:flex-col h-screen w-20 xl:w-80 fixed left-0 top-0 border-r-2 border-neutral-900 items-center xl:items-start xl:pl-24 py-4">
      {/* className="hidden min-[500px]:flex space-y-2 min-[500px]:flex-col h-screen w-20 xl:w-80 fixed left-0 top-0 border-r-2 border-neutral-900 items-center xl:items-start xl:pl-24 py-4" */}
      <div className="pb-4 px-4">
        {" "}
        <BsTwitter size={25} />
      </div>
      <Link href="/">
        <button className="py-2 flex hover:bg-neutral-900 px-4 rounded-full">
          {" "}
          <RiHome7Fill size={25} />
          <span className="pl-3 min-[500px]:max-xl:hidden block">Home</span>
        </button>
      </Link>
      <button className="py-2 flex hover:bg-neutral-900 px-4 rounded-full">
        {" "}
        <FiHash size={25} />
        <span className="pl-3  min-[500px]:max-xl:hidden block">Explore</span>
      </button>
      <button className="py-2 flex hover:bg-neutral-900 px-4 rounded-full">
        {" "}
        <RiNotification3Line size={25} />
        <span className="pl-3 min-[500px]:max-xl:hidden block">
          Notifications
        </span>
      </button>
      <button
        onClick={CheckSigned}
        className="py-2 flex hover:bg-neutral-900 px-4 rounded-full"
      >
        {" "}
        <HiOutlineMail size={25} />
        <span className="pl-3 min-[500px]:max-xl:hidden block">Messages</span>
      </button>

      <button
        onClick={showBookmarks}
        className="py-2 flex hover:bg-neutral-900 px-4 rounded-full"
      >
        {" "}
        <BiBookmark size={25} />
        <span className="pl-3 min-[500px]:max-xl:hidden block">Bookmarks</span>
      </button>

      <button
        onClick={CheckSigned}
        className="py-2 flex hover:bg-neutral-900 px-4 rounded-full"
      >
        {" "}
        <BiUser size={25} />
        <span className="pl-3 xl:block min-[500px]:hidden block">Profile</span>
      </button>

      {session && (
        <button
          onClick={() => signOut()}
          className="py-2 flex hover:bg-neutral-900 px-4 rounded-full fixed bottom-3 left-3"
        >
          {" "}
          <RiLogoutBoxRLine size={25} />
          <span className="pl-3 xl:block min-[500px]:hidden block">LogOut</span>
        </button>
      )}
    </div>
  );
};

export default Sidebar;
