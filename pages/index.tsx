import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import SNavbar from "../components/SNavbar";
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Card from "../components/Card";
import { useState } from "react";

const staggerFadeUp = {
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState();
  return (
    <>
      <SNavbar />
      <Head>
        <title>SubWoofer | Home</title>
      </Head>
      <main>
        <section className='min-h-[80vh]'>
          <img
            className='-z-50 absolute aspect-video h-screen w-full -translate-y-15'
            src='/photos/heroimage.jpg'
          />
          <motion.div
            initial={{ y: "100%", x: "-50%", opacity: 0 }}
            animate={{ y: "-75%", opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='flex flex-col absolute items-center left-1/2 top-1/2'
          >
            <motion.h1 className='mx-auto mt-8 font-src-pro font-semibold text-6xl max-w-[24ch] text-center text-white'>
              Customize Your Shareable Playlists
            </motion.h1>
            <motion.button
              className='bg-g-primary text-white font-semibold p-[.5em] px-[1em] rounded-3xl shadow-2xl hover:bg-[#1ed760] transition-colors mt-4'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => signIn()}
            >
              Get Started
            </motion.button>
          </motion.div>
        </section>

        <section className='bg-card-base overflow-hidden' id='most-recent'>
          <motion.h1 className='ml-20 relative py-20 text-white'>
            Most Recent
          </motion.h1>
          <motion.div
            variants={staggerFadeUp}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            className='grid grid-cols-4 gap-6 justify-items-center px-4'
          >
            <Card strung={"song1"} />
            <Card strung={"song1"} />
            <Card strung={"song1"} />
            <Card strung={"song1"} />
          </motion.div>
        </section>

        <section id='most-listened-artists'></section>
        <section id='most-listened-songs'></section>
        <section id='customized-playlists'></section>
      </main>
    </>
  );
};

export default Home;

// export const getStaticProps: GetStaticProps = async () => {
//   return {
//     props: {}
//   };
// };
