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

const PhoneSidebar = (props) => {
  const HamClasses = props.classes;
  const { data: session } = useSession();
  return (
    <div className={HamClasses}>
      <div className="pb-4 px-4">
        {" "}
        <BsTwitter size={25} />
      </div>
      <button className="py-2 flex hover:bg-neutral-900 px-4 rounded-full">
        {" "}
        <RiHome7Fill size={25} />
        <span className="pl-3  block">Home</span>
      </button>
      <button className="py-2 flex hover:bg-neutral-900 px-4 rounded-full">
        {" "}
        <FiHash size={25} />
        <span className="pl-3 block">Explore</span>
      </button>
      <button className="py-2 flex hover:bg-neutral-900 px-4 rounded-full">
        {" "}
        <RiNotification3Line size={25} />
        <span className="pl-3  block">Notifications</span>
      </button>
      <button className="py-2 flex hover:bg-neutral-900 px-4 rounded-full">
        {" "}
        <HiOutlineMail size={25} />
        <span className="pl-3 block">Messages</span>
      </button>
      <button className="py-2 flex hover:bg-neutral-900 px-4 rounded-full">
        {" "}
        <BiBookmark size={25} />
        <span className="pl-3 block">Bookmarks</span>
      </button>

      <Link href="/auth/signin">
        {" "}
        <button className="py-2 flex hover:bg-neutral-900 px-4 rounded-full">
          {" "}
          <BiUser size={25} />
          <span className="pl-3 block">Profile</span>
        </button>
      </Link>
      {session && (
        <button
          onClick={() => signOut()}
          className="py-2 flex hover:bg-neutral-900 px-4 rounded-full fixed bottom-3 left-3"
        >
          {" "}
          <RiLogoutBoxRLine size={25} />
          <span className="pl-3 block">LogOut</span>
        </button>
      )}
    </div>
  );
};

export default PhoneSidebar;
