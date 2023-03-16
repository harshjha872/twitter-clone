import React from "react";
import PersonFollow from "./PersonFollow";

const WhotoFollow = () => {
  return (
    <div className="my-3 sticky top-16 bg-neutral-900 py-3 rounded-2xl flex flex-col max-w-sm h-fit">
      <div className="text-xl font-semibold px-4 py-3">You might like</div>
      <PersonFollow />
      <PersonFollow />
    </div>
  );
};

export default WhotoFollow;
