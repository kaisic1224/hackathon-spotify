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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='text-white font-semibold tracking-wider mt-20 shadow-xl bg-g-primary p-3 rounded-xl shadow-green-400 hover:bg-[#1ed760]'
          onClick={() => signIn("spotify", { callbackUrl: "/" })}
        >
          Sign in
        </motion.button>
      </div>
    </>
  );
};
export default signin;
