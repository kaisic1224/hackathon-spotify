import React from "react";
import { signIn } from "next-auth/react";
import Head from "next/head";

const signin = () => {
  return (
    <>
      <Head>
        <title>Sign In | Recycle Master</title>
      </Head>
      <div className="text-center w-screen h-screen grid place-items-center bg-black/[0.95]">
        <div>
          <div className="flex">
            <h1 className="text-white text-6xl font-bold translate-y-5 pr-4">
              Sign in to{" "}
            </h1>
            <h1 className="animated-text">EXPERIENCE</h1>
          </div>
          <button
            className="mt-10 p-4 text-2xl font-bold bg-purple-600 rounded-2xl shadow-2xl hover:bg-purple-500"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

export default signin;
