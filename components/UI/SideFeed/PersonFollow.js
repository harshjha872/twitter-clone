import React from "react";

const PersonFollow = () => {
  return (
    <div className="flex h-fit w-full px-4 py-3 justify-between items-center">
      <div className="flex">
        <div className="w-12 h-12 rounded-full bg-neutral-700"></div>
        <div className="flex flex-col pl-2">
          <div className="font-bold">Harsh Jha</div>
          <div className="text-neutral-600 font-semibold">@harshjha872</div>
        </div>
      </div>
      <button className="bg-white text-neutral-900 rounded-full w-20 h-8 font-medium">
        follow
      </button>
    </div>
  );
};

export default PersonFollow;
