import React from "react";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import { BsTwitter } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = ({ providers }) => {
  const router = useRouter();
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangeHandlerEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeHandlerPassword = (e) => {
    setPassword(e.target.value);
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    const result = await signIn("credentials", {
      redirect: false,
      email: Email,
      password: password,
      callbackUrl: "/",
    });

    if (result.ok) {
      router.push(result.url);
    } else {
      toast.error(result.error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }

    // if (!result.error) {
    //   // set some auth state
    //   console.log(result);
    //   Router.push("/");
    // } else {
    //   console.log(result.error);
    // }

    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_HOST}/api/loginuser`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       Email,
    //       password,
    //     }),
    //   }
    // );
    // const data = await response.json();
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
        <div className="text-3xl text-center my-8 font-black underline-offset-4">
          Login
        </div>
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
        <div className="text-sm flex justify-end my-4">
          <a
            href=""
            className="font-medium text-neutral-600 hover:text-neutral-500"
          >
            Forgot your password?
          </a>
        </div>
        <div className="text-sm flex justify-start my-4">
          <div className="font-medium text-neutral-600">
            dont have an account yet?{" "}
            <Link href="/auth/signup">
              <span className="text-indigo-500 hover:underline">Sign Up</span>
            </Link>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <button
            type="submit"
            className="w-52 mt-3 text-white bg-neutral-800 border-0 py-4 px-6 font-semibold focus:outline-none hover:bg-white hover:text-black transition duration-300 ease-in-out rounded-full text-center"
          >
            Submit
          </button>
        </div>
      </form>
      {providers && (
        <div
          key={Object.values(providers)[0].name}
          className="w-full flex justify-center"
        >
          <button
            className="w-52 text-white bg-neutral-800 hover:bg-white hover:text-black transition duration-300 ease-in-out py-3 font-semibold px-4 rounded-full flex items-center"
            onClick={() =>
              signIn(Object.values(providers)[0].id, { callbackUrl: "/" })
            }
          >
            Sign in with {Object.values(providers)[0].name}{" "}
            <FcGoogle className="px-1" size={32} />
          </button>
        </div>
      )}
    </>
  );
};

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
