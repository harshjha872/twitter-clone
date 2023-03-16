import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";
import axios from "axios";
import Router from "next/router";

const Signup = (props) => {
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeHandlerName = (e) => {
    setName(e.target.value);
  };
  const onChangeHandlerEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeHandlerPassword = (e) => {
    setPassword(e.target.value);
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setPassword("");
    const data = await axios.post(
      `${process.env.NEXTAUTH_URL}/api/auth/signup`,
      {
        name: name,
        Email: Email,
        password: password,
      }
    );

    // const data = await response.json();

    if (data) {
      console.log("User created");
      Router.push("/auth/signin");
    }
  };
  return (
    <>
      <div
        className="flex justify-center
 w-full py-6 text-sky-500 fixed top-0 bg-neutral-900"
      >
        <BsTwitter size={27} />
      </div>
      <form
        onSubmit={SubmitHandler}
        method="POST"
        className="pt-4 lg:w-[35vw] w-[80vw] md:w-[60vw] px-2 mx-auto mt-[70px]"
      >
        <div className=" text-center my-8 ">
          <span className=" text-3xl font-black ">Sign up</span>
        </div>

        <div>Name</div>
        <input
          onChange={onChangeHandlerName}
          value={name}
          id="name"
          name="name"
          type="text"
          className="bg-neutral-800 text-white block my-2 w-full p-3 border rounded border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent placeholder-neutral-600 "
          placeholder="Name"
        />
        <div>Email</div>
        <input
          id="Email"
          name="Email"
          type="email"
          onChange={onChangeHandlerEmail}
          value={Email}
          className="bg-neutral-800 text-white block my-2 w-full p-3 border rounded border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent placeholder-neutral-600 "
          placeholder="Email"
        />
        <div>Password</div>
        <input
          onChange={onChangeHandlerPassword}
          value={password}
          id="password"
          name="password"
          type="password"
          className="bg-neutral-800 text-white block my-2 w-full p-3 border rounded border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent placeholder-neutral-600 "
          placeholder="password"
        />
        <div className="flex justify-center my-8">
          <button
            type="submit"
            className="text-white bg-neutral-800 border-0 py-2 px-6 focus:outline-none hover:bg-white hover:text-black transition duration-300 ease-in-out rounded text-lg text-center"
          >
            submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;
