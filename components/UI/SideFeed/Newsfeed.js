import React from "react";
import Image from "next/image";
import SingleNews from "./SingleNews";

const Newsfeed = () => {
  return (
    <div className="my-4 bg-neutral-900 py-2 rounded-2xl flex flex-col max-w-sm h-fit">
      <div className="text-xl font-semibold px-4 py-3">Whats happening </div>
      <SingleNews />
      <SingleNews />
      <SingleNews />
    </div>
  );
};

export default Newsfeed;
