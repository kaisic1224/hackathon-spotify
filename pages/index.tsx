import type { NextPage } from "next";
import Head from "next/head";
import SNavbar from "../components/SNavbar";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { LayoutGroup, motion } from "framer-motion";
import { artist, playlistItem, track } from "../components/Card";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useLayoutEffect } from "react";
import Locked from "../components/Locked";
import DatePicker from "../components/DatePicker";
import CardGrid from "../components/CardGrid";
import LoadMore from "../components/LoadMore";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export const DateContext = React.createContext({
  time_range: "short_term",
  setTime: (newTime: string) => {}
});

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  const [recentTracks, setRecent] = useState<playlistItem[]>([]);
  const [topArtists, setTopArtists] = useState<artist[]>([]);
  const [topTracks, setTopTracks] = useState<track[]>([]);

  const [sectName, setName] = useState<string>();
  const [time_range, setTime] = useState("short_term");
  const [time_range2, setTime2] = useState("short_term");
  const [ref, inView, entry] = useInView();
  const [ref2, inView2, entry2] = useInView({ threshold: 0.2, delay: 0.25 });
  const [ref3, inView3, entry3] = useInView({ threshold: 0.2, delay: 0.25 });
  const [ref4, inView4, entry4] = useInView({ threshold: 0.2, delay: 0.25 });

  useLayoutEffect(() => {
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
    const fetchSession = async () => {
      const recently = await fetch("/api/getRecent");
      const recentlyData = await recently.json();
      setRecent(recentlyData.items);
      setTopArtists(JSON.parse(sessionStorage.getItem("topTracks")!));
      setTopTracks(JSON.parse(sessionStorage.getItem("topTracks")!));
    };

    const fetchData = async () => {
      // ASSURE THERE IS A SESSION FIRST
      const session = await getSession();
      if (!session) return;

      // FETCH RECENTLY PLAYED SONGS
      const recently = await fetch("/api/getRecent");
      const recentlyData = await recently.json();
      setRecent(recentlyData.items);

      // FETCH MOST PLAYED ARTISTS IN SHORT TIME PERIOD
      const top = await fetch("/api/topArtists");
      const topData = await top.json();
      setTopArtists(topData.items);
      sessionStorage.setItem("topArtists", JSON.stringify([...topData.items]));

      // FETCH POPULAR SONGS
      const topT = await fetch("/api/topTracks");
      const topTracksData = await topT.json();
      setTopTracks(topTracksData.items);
      sessionStorage.setItem(
        "topTracks",
        JSON.stringify([...topTracksData.items])
      );

      const today = new Date(Date.now() + 1000 * 60 * 5).getTime();
      sessionStorage.setItem("timestamp", today.toString());
    };

    if (parseInt(sessionStorage.getItem("timestamp")!) > Date.now()) {
      fetchSession();
      return;
    }

    fetchData();
  }, []);

  if (session?.error === "refresh error") {
    return (
      <>
        <Head>
          <title>SubWoofer | Error</title>
          <meta charSet='UTF-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
        </Head>
        <SNavbar viewedSection={sectName!} />
        <main className='text-white text-center overflow-y-hidden pb-24'>
          <h1 className='mt-48 text-5xl'>Refresh Token Error</h1>
          <p className='text-lg'>Try signing in again</p>
          <motion.button
            className='bg-g-primary text-white hover:text-green-50 hover:shadow-green-400 font-semibold p-[.5em] px-[1.5em] rounded-3xl shadow-2xl hover:bg-[#1ed760] transition-colors mt-4'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => signIn()}
          >
            Sign In
          </motion.button>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>SubWoofer | Home</title>
      </Head>

      <SNavbar viewedSection={sectName!} />
      <Menu />
      <header className='min-h-[89vh]'>
        <img
          className='-z-10 absolute object-cover aspect-video h-screen w-full select-none -translate-y-15'
          src='/photos/heroimage.jpg'
        />
        <motion.div
          initial={{ y: "100%", x: "-50%", opacity: 0 }}
          animate={{ y: "-75%", opacity: 1 }}
          transition={{ duration: 0.6 }}
          className='flex flex-col absolute justify-center items-center left-1/2 top-1/2'
        >
          <motion.h1 className='mx-auto mt-8 font-src-pro font-semibold text-6xl max-w-[24ch] text-center text-white'>
            Customize Your Shareable Playlists
          </motion.h1>
          {session?.user ? (
            <motion.div
              className='text-white text-center font-src-pro font-bold text-xl flex items-center
              flex-col mt-4 xs:gap-2
              md:gap-6 md:flex-row md:min-w-max'
            >
              <span className='max-w-max flex'>
                Welcome Back,{" "}
                <img
                  src={session?.user?.image!}
                  className='rounded-full aspect-square w-8 object-cover ml-3 mr-1'
                  alt={`${session?.user?.name}'s profile picture`}
                />{" "}
                <u className='ml-1'>{session?.user.name}</u>!
              </span>
              <motion.button
                className='bg-g-primary text-lg hover:text-green-50 font-semibold p-[.5em] px-[1em] rounded-3xl
                 hover:shadow-green-400 shadow-2xl hover:bg-[#1ed760] transition-colors
                 xs:mt-2'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signOut()}
              >
                Not you? Log Out
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              className='bg-g-primary text-white hover:text-green-50 hover:shadow-green-400 font-semibold p-[.5em] px-[1em] rounded-3xl shadow-2xl hover:bg-[#1ed760] transition-colors mt-4'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signIn()}
            >
              Get Started
            </motion.button>
          )}
        </motion.div>
      </header>
      <main className='relative bg-card-base'>
        {session?.user ? null : <Locked />}
        <section
          className='relative px-8 mx-auto pb-8'
          id='most-recent'
          ref={ref}
        >
          <motion.h2 className='px-20 text-white xs:text-center xs:py-16 lg:py-20'>
            Most Recent
          </motion.h2>
          {recentTracks?.length ?? 0 != 0 ? (
            <CardGrid layoutID='recent' dataItems={recentTracks} />
          ) : null}
        </section>
        <section
          className='relative px-8 mx-auto pb-8'
          id='most-listened-artists'
          ref={ref2}
        >
          <DateContext.Provider value={{ time_range, setTime }}>
            <motion.h2 className='px-20 py-20 flex flex-col gap-3 text-white xs:text-center'>
              Most Listened Artists
              <DatePicker endpoint='topArtists' setFn={setTopArtists} />
            </motion.h2>
            {topArtists?.length ?? 0 != 0 ? (
              <CardGrid layoutID='artists' dataItems={topArtists} />
            ) : (
              <span>
                {session?.user?.name} has not played anything in the last 30
                days
              </span>
            )}
            <LoadMore
              setFn={setTopArtists}
              endpoint='topArtists'
              items={topArtists}
              anchor='most-listened-artists'
            />
          </DateContext.Provider>
        </section>
        <section
          className='relative px-8 mx-auto pb-8'
          id='most-listened-songs'
          ref={ref3}
        >
          <DateContext.Provider
            value={{ time_range: time_range2, setTime: setTime2 }}
          >
            <motion.h2 className='px-20 flex flex-col gap-3 py-20 text-white xs:text-center'>
              Most Listened Songs
              <DatePicker endpoint='topTracks' setFn={setTopTracks} />
            </motion.h2>
            {topTracks?.length ?? 0 != 0 ? (
              <CardGrid layoutID='tracks' dataItems={topTracks} />
            ) : null}
            <LoadMore
              setFn={setTopTracks}
              endpoint='topTracks'
              items={topTracks}
              anchor='most-listened-songs'
            />
          </DateContext.Provider>
        </section>
        <section
          className='relative px-8 mx-auto pb-8'
          id='customized-playlists'
          ref={ref4}
        >
          <motion.h2 className='px-20 py-20 text-white xs:text-center'>
            Customized Playlists
          </motion.h2>

          <div className='flex items-center justify-center pb-12'>
            <LayoutGroup>
              <Link href='/playlists'>
                <motion.div className='absolute cursor-pointer bg-card-accent duration-200 mx-auto p-[.35em] hover:p-[.85em] rounded-full transition-all w-fit'>
                  <FaArrowRight className='fill-white w-6 h-6' />
                </motion.div>
              </Link>
            </LayoutGroup>
          </div>
        </section>
      </main>

      {session?.user && <Footer />}
    </>
  );
};

export default Home;
