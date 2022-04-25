import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import SNavbar from "../components/SNavbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Card, { playlistItem, track } from "../components/Card";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useCallback } from "react";
import Locked from "../components/Locked";
import { useRouter } from "next/router";

const staggerFadeUp = {
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [recentTracks, setRecent] = useState<playlistItem[]>([]);
  const [topTracks, setTopTracks] = useState<track[]>([]);

  const [sectName, setName] = useState<string>();
  const [ref, inView, entry] = useInView();
  const [ref2, inView2, entry2] = useInView();
  const [ref3, inView3, entry3] = useInView();
  const [ref4, inView4, entry4] = useInView();

  useEffect(() => {
    if (entry?.isIntersecting) {
      setName("Most Recent");
    }
    if (entry2?.isIntersecting) {
      setName("Favourite Artists");
    }
    if (entry3?.isIntersecting) {
      setName("Favourite Songs");
    }
    if (entry4?.isIntersecting) {
      setName("Playlists Made For You");
    }
  }, [inView, inView2, inView3, inView4]);

  useEffect(() => {
    const fetchData = async () => {
      // FETCH RECENTLY PLAYED SONGS
      const recently = await fetch("/api/getRecent");
      const recentlyData = await recently.json();
      setRecent(recentlyData.items);

      // FETCH MOST PLAYED ARTISTS IN SHORT TIME PERIOD
      const top = await fetch("/api/topArtists");
      const topData = await top.json();
      setTopTracks(topData.items);
    };
    fetchData();
  }, []);

  return (
    <>
      <SNavbar viewedSection={sectName!} />
      <Head>
        <title>SubWoofer | Home</title>
      </Head>
      <main>
        <section className='min-h-[89vh]'>
          <img
            className='-z-50 absolute aspect-video h-screen w-full select-none -translate-y-15'
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
            {session?.user ? (
              <motion.div className='text-white font-src-pro font-bold text-xl'>
                Welcome Back, {session?.user.name}!
                <motion.button
                  className='bg-g-primary text-lg text-white font-semibold p-[.5em] px-[1em] rounded-3xl shadow-2xl hover:bg-[#1ed760] transition-colors mt-4 ml-6'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => signOut()}
                >
                  Not you? Log Out
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                className='bg-g-primary text-white font-semibold p-[.5em] px-[1em] rounded-3xl shadow-2xl hover:bg-[#1ed760] transition-colors mt-4'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signIn()}
              >
                Get Started
              </motion.button>
            )}
          </motion.div>
        </section>
        <section className='bg-card-base' id='most-recent' ref={ref}>
          <motion.h2 className='px-20 py-20 text-white'>Most Recent</motion.h2>
          {recentTracks.length != 0 && (
            <motion.div
              variants={staggerFadeUp}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
              className='grid grid-cols-4 gap-6 justify-items-center px-4 overflow-hidden'
            >
              {recentTracks.map((item) => (
                <Card key={item.track.id} song={item} />
              ))}
            </motion.div>
          )}
          <div className='py-60'></div>
        </section>
        <section
          className='bg-card-base relative'
          id='most-listened-artists'
          ref={ref2}
        >
          <motion.h2 className='px-20 py-20 text-white'>
            Most Listened Artists
          </motion.h2>
          {/* {session?.user ? null : <Locked />} */}
          {topTracks.length != 0 && (
            <motion.div
              variants={staggerFadeUp}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
              className='grid grid-cols-4 gap-6 justify-items-center px-4 overflow-hidden'
            >
              {topTracks.map((item) => (
                <Card key={item.id} song={item} />
              ))}
            </motion.div>
          )}
          <div className='py-60'></div>
        </section>
        <section className='bg-card-base' id='most-listened-songs' ref={ref3}>
          <motion.h2 className='px-20 relative py-20 text-white'>
            Most Listened Songs
          </motion.h2>
          <div className='py-60'></div>
        </section>
        <section className='bg-card-base' id='customized-playlists' ref={ref4}>
          <motion.h2 className='px-20 relative py-20 text-white'>
            Customized Playlists
          </motion.h2>
          <div className='py-60'></div>
        </section>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  // const recentlyRes = await fetch("http://localhost:3000/api/getRecent");
  // const recently = await recentlyRes.json();
  return {
    props: {}
  };
};
