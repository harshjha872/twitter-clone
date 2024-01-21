import React, { useState } from "react";
import PersonFollow from "./PersonFollow";
import { useEffect } from "react";
import axios from "axios";
const WhotoFollow = () => {
  const [users, setUsers] = useState([])
  useEffect(()=>{
    const getPhoto = async () => {
      const res = await axios.get(`https://api.slingacademy.com/v1/sample-data/users?offset=${Math.floor((Math.random() * 20) + 1)}&limit=3`)
      if(res.data.success === true) {
        const users = res.data.users.map(user => {
          return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_picture: user.profile_picture,
            username: user.email.split("@")[0]
          }
        })
        setUsers(users)
      }
    }
    getPhoto()
  },[])
  return (
    <div className="my-3 sticky top-16 bg-neutral-900 py-3 rounded-2xl flex flex-col max-w-sm h-fit">
      <div className="text-xl font-semibold px-4 py-3">You might like</div>
      {users.length > 0 && users.map(user => <PersonFollow key={user.id} first_name={user.first_name}last_name={user.last_name} profile_picture={user.profile_picture} username={user.username} />)}
    </div>
  );
};

export default WhotoFollow;
