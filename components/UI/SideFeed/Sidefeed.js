import React from "react";
import { BiSearch } from "react-icons/bi";
import WhotoFollow from "./WhotoFollow";
import Newsfeed from "./Newsfeed";

const Sidefeed = () => (
  // Search Bar
  <div className="sticky top-0 hidden lg:flex w-full lg:flex-col mx-8 my-4 h-fit lg:self-start">
    <div className="top-0 max-w-sm flex items-center relative w-full h-12 bg-neutral-900 rounded-3xl">
      <BiSearch size={21} className="mx-4 text-neutral-600" />
      <input
        type="text"
        className="focus:outline-none focus:ring-1 focus:ring-sky-400 pl-12 inset-0 absolute bg-transparent h-full w-full rounded-3xl p-3 font-semibold placeholder-neutral-600"
        placeholder="Search Twitter"
      />
    </div>

    {/* News feed */}

    <Newsfeed />

    {/* who to follow card */}

    <WhotoFollow />
  </div>
);

export default Sidefeed;
