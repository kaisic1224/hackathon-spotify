import { motion, Reorder } from "framer-motion";
import { getSession } from "next-auth/react";
import { FaLink } from "react-icons/fa";
import { useEffect, useState } from "react";
import { artist, playlistItem, track } from "../components/Card";
import Head from "next/head";
import CardGrid from "../components/CardGrid";
import Display from "../components/Display";

const fadeinUp = {
  s: { opacity: 0, y: "100%" },
  a: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 1
    }
  }
};

const playlists = () => {
  const [recent, setRecent] = useState<playlistItem[]>([]);
  const [topArtists, setTopArtists] = useState<artist[]>([]);
  const [topTracks, setTopTracks] = useState<track[]>([]);
  const [recommended, setRecommended] = useState<track[]>([]);
  const [recommended1, setRecommended1] = useState<track[]>([]);
  const [recommended2, setRecommended2] = useState<track[]>([]);
  const [recommended3, setRecommended3] = useState<track[]>([]);
  const [loading, setloading] = useState(true);

  const fetchRecommended = async () => {
    const queryParamString = new URLSearchParams({
      seed_genres: topArtists[0]?.genres.join(","),
      seed_artists: topArtists[0]?.id,
      limit: "8"
    });
    const res = await fetch("/api/getRecommend?" + queryParamString.toString());
    const data = await res.json();
    setRecommended([...data.tracks]);

    const queryParamString1 = new URLSearchParams({
      seed_genres: topArtists[1].genres.join(","),
      seed_artists: topArtists[1].id,
      limit: "8"
    });
    const res1 = await fetch(
      "/api/getRecommend?" + queryParamString1.toString()
    );
    const data1 = await res1.json();
    setRecommended1([...data1.tracks]);

    const queryParamString2 = new URLSearchParams({
      seed_genres: topArtists[2].genres.join(","),
      seed_artists: topArtists[2].id,
      limit: "8"
    });
    const res2 = await fetch(
      "/api/getRecommend?" + queryParamString2.toString()
    );
    const data2 = await res2.json();
    setRecommended2([...data2.tracks]);

    const queryParamString3 = new URLSearchParams({
      seed_genres: topArtists[3].genres.join(","),
      seed_artists: topArtists[3].id,
      limit: "8"
    });
    const res3 = await fetch(
      "/api/getRecommend?" + queryParamString3.toString()
    );
    const data3 = await res3.json();
    setRecommended3([...data3.tracks]);
  };

  useEffect(() => {
    const fetchSession = () => {
      setTopArtists(JSON.parse(sessionStorage.getItem("artists")!));
      setloading(false);
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
      sessionStorage.setItem("artists", JSON.stringify([...topData.items]));

      // FETCH POPULAR SONGS
      const topT = await fetch("/api/topTracks");
      const topTracksData = await topT.json();
      setTopTracks(topTracksData.items);
      sessionStorage.setItem(
        "tracks",
        JSON.stringify([...topTracksData.items])
      );

      console.log("i am being called from fetchdata");
      setloading(false);

      const today = new Date(Date.now() + 1000 * 60 * 5).getTime();
      sessionStorage.setItem("timestamp", today.toString());
    };

    if (parseInt(sessionStorage.getItem("timestamp")!) > Date.now()) {
      fetchSession();
      return;
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (topArtists.length != 0) fetchRecommended();
  }, [loading]);

  return (
    <>
      <Head>
        <title>Your Playlists | SubWoofer</title>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <main className='text-white px-8'>
        <motion.div
          layoutId='nextPage'
          className='bg-card-base overflow-hidden -z-50 -left-[5%] -top-[90%] w-[110vw] h-[500vh] absolute rounded-full'
        />
        <motion.h1
          variants={fadeinUp}
          initial='s'
          animate='a'
          className='text-6xl'
        >
          How about some bops?
        </motion.h1>
        <>
          <motion.h2 variants={fadeinUp} initial='s' animate='a'>
            Because you listen to {topArtists[0]?.name}...
          </motion.h2>
          <motion.div>
            {recommended.length != 0 && <Display items={recommended} />}
          </motion.div>
          <motion.h2 variants={fadeinUp} initial='s' animate='a'>
            Or how about some {topArtists[1]?.name}?
          </motion.h2>
          <motion.div>
            {recommended1.length != 0 && <Display items={recommended1} />}
          </motion.div>
          <motion.h2 variants={fadeinUp} initial='s' animate='a'>
            Because you like {topArtists[2]?.name}
          </motion.h2>
          <motion.div>
            {recommended2.length != 0 && <Display items={recommended2} />}
          </motion.div>
          <motion.h2 variants={fadeinUp} initial='s' animate='a'>
            Because you like {topArtists[3]?.name}
          </motion.h2>
          <motion.div>
            {recommended3.length != 0 && <Display items={recommended3} />}
          </motion.div>
        </>
      </main>
    </>
  );
};
export default playlists;
