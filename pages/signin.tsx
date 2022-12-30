import Head from "next/head";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

const signin = () => {
  return (
    <>
      <Head>
        <title>Sign In | SubWoofer</title>
      </Head>

      <div className='bg-black-main text-center h-screen grid lg:grid-cols-2'>
        <div className='flex justify-between lg:justify-center lg:gap-12 flex-col py-[12vh]'>
          <h1 className='text-5xl font-bold text-white text-center'>
            Seconds away from creating your <u>customized playlists</u>
          </h1>
          <img
            src='/girl-enjoying-music.svg'
            alt='girl with headphones enjoying music'
          />
        </div>
        <div className='flex items-center justify-center relative'>
          <motion.button
            className='text-white w-3/4 font-bold tracking-wider uppercase text-3xl shadow-2xl p-3 rounded-xl
            hover:from-[#0BAB64] hover:to-[#48daab]
            bg-gradient-to-tr from-[#0BAB64] to-[#3BB78F]
            shadow-g-primary'
            onClick={() => signIn("spotify", { callbackUrl: "/" })}
          >
            Sign In
          </motion.button>
        </div>
      </div>
    </>
  );
};
export default signin;
