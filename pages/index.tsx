import type { NextPage } from "next";
import Head from "next/head";
import SNavbar from "../components/SNavbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { artist, playlistItem, track } from "../components/Card";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import Locked from "../components/Locked";
import { useRouter } from "next/router";
import DatePicker from "../components/DatePicker";
import CardGrid from "../components/CardGrid";
import LoadMore from "../components/LoadMore";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [recentTracks, setRecent] = useState<playlistItem[]>([]);
  const [topArtists, setTopArtists] = useState<artist[]>([]);
  const [topTracks, setTopTracks] = useState<track[]>([]);
  const [recommended, setRecommended] = useState<track[]>([]);

  const [sectName, setName] = useState<string>();
  const [ref, inView, entry] = useInView({ threshold: 0.4, delay: 0.25 });
  const [ref2, inView2, entry2] = useInView({ threshold: 0.4, delay: 0.25 });
  const [ref3, inView3, entry3] = useInView({ threshold: 0.4, delay: 0.25 });
  const [ref4, inView4, entry4] = useInView({ threshold: 0.2, delay: 0.25 });

  const menu = (e) => {
    console.log(e);
    console.log("jajajaja");
  };
  useEffect(() => {
    document.addEventListener("contextmenu", menu);

    return () => {
      document.removeEventListener("contextmenu", menu);
    };
  }, []);

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
      setTopArtists(topData.items);

      // FETCH MOST PLAYED TRACKS
      const topT = await fetch("/api/topTracks");
      const topTracksData = await topT.json();
      setTopTracks(topTracksData.items);

      // GET RECOMMENDATIONS
      const recQueries = new URLSearchParams({
        seed_artists: [...topData.items]
          .slice(0, 2)
          .map((artist) => artist.id)
          .join(","),
        seed_genres: [...topData.items]
          .slice(0, 2)
          .map((artist) => artist.genres[0])
          .join(",")
      });
      const rec = await fetch("/api/getRecommend?" + recQueries.toString());
      const recData = await rec.json();
      setRecommended(recData.tracks);
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>SubWoofer | Home</title>
      </Head>

      <SNavbar viewedSection={sectName!} />
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
              <span className='max-w-max'>
                Welcome Back, <u className='ml-1'>{session?.user.name}</u>!
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
        <section className='relative pb-8' id='most-recent' ref={ref}>
          <motion.h2 className='px-20 text-white xs:text-center xs:py-16 lg:py-20'>
            Most Recent
          </motion.h2>
          {recentTracks?.length ?? 0 != 0 ? (
            <CardGrid layoutID='recent' dataItems={recentTracks} />
          ) : null}
        </section>
        <section
          className='relative pb-8'
          id='most-listened-artists'
          ref={ref2}
        >
          <motion.h2 className='px-20 py-20 flex flex-col gap-3 text-white xs:text-center'>
            Most Listened Artists
            <DatePicker endpoint='topArtists' setFn={setTopArtists} />
          </motion.h2>
          {topArtists?.length ?? 0 != 0 ? (
            <CardGrid layoutID='artists' dataItems={topArtists} />
          ) : (
            <span>
              {session?.user?.name} has not played anything in the last 30 days
            </span>
          )}
          <LoadMore setFn={setTopArtists} endpoint='topArtists' />
        </section>
        <section className='relative pb-8' id='most-listened-songs' ref={ref3}>
          <motion.h2 className='px-20 flex flex-col gap-3 py-20 text-white xs:text-center'>
            Most Listened Songs
            <DatePicker endpoint='topTracks' setFn={setTopTracks} />
          </motion.h2>
          {topTracks?.length ?? 0 != 0 ? (
            <CardGrid layoutID='tracks' dataItems={topTracks} />
          ) : null}
        </section>
        <section className='relative pb-8' id='customized-playlists' ref={ref4}>
          <motion.h2 className='px-20 py-20 text-white xs:text-center'>
            Customized Playlists
          </motion.h2>
          {recommended?.length ?? 0 != 0 ? (
            <CardGrid layoutID='recommended' dataItems={recommended} />
          ) : null}
        </section>
        <div className='text-white' onClick={async () => {}}>
          i am spotty
        </div>
      </main>
    </>
  );
};

export default Home;
