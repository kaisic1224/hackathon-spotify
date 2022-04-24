import Head from "next/head";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

const signin = () => {
  return (
    <>
      <Head>
        <title>Sign In | Subussy</title>
      </Head>

      <div className='bg-card-base text-center h-screen'>
        <h1 className='text-5xl text-white text-center pt-40'>
          Welcome! Login to your spotify to see your statistics!
        </h1>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='text-white mt-20 shadow-2xl bg-g-primary p-3 rounded-xl hover:bg-[#1ed760]'
          onClick={() => signIn("spotify", { callbackUrl: "/" })}
        >
          Sigussy In
        </motion.button>
      </div>
    </>
  );
};
export default signin;
