import React from "react";

const PersonFollow = (props) => {
  const avatar = {
    verticalAlign: "middle",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  };
  return (
    <div className="flex h-fit w-full px-4 py-3 justify-between items-center">
      <div className="flex">
        {/* <div className="w-12 h-12 rounded-full bg-neutral-700">
          <img style={{ borderRadius: '100px' }} src={props.profile_picture} alt="profile photo"/>
        </div> */}
        <img
          src={props.profile_picture}
          alt="Avatar"
          style={{
            verticalAlign: "middle",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              margin: "5px",
          }}
        ></img>
        <div className="flex flex-col pl-2">
          <div className="font-bold">
            {props.first_name} {props.last_name}
          </div>
          <div className="text-neutral-600 font-semibold">
            @{props.username}
          </div>
        </div>
      </div>
      <button className="bg-white text-neutral-900 rounded-full w-20 h-8 font-medium">
        follow
      </button>
    </div>
  );
};

export default PersonFollow;
