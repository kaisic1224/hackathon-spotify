import { AnimatePresence, motion, Reorder } from "framer-motion";
import { getSession, signIn, useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import { artist, playlistItem, track } from "../lib/api.d";
import Head from "next/head";
import Playlist from "../components/Playlist";
import PlaylistLoader from "../components/PlaylistLoader";
import Carousel from "../components/Carousel";

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
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    }
  });
  const [recent, setRecent] = useState<playlistItem[]>([]);
  const [topArtists, setTopArtists] = useState<artist[]>([]);
  const [topTracks, setTopTracks] = useState<track[]>([]);
  const [recommended, setRecommended] = useState<track[]>([]);
  const [loading, setloading] = useState(true);

  const fetchRecommended = async () => {
    const sGenres = topArtists
      .slice(0, 2)
      .filter((artist) => artist.genres.length != 0)
      .map((artist) => artist.genres.slice(0, 1))
      .join(",");
    const sArtists = topArtists
      .slice(0, 2)
      .map((artist) => artist.id)
      .join(",");
    const queryParamString = new URLSearchParams({
      seed_genres: sGenres,
      seed_artists: sArtists,
      limit: "10"
    });
    const res = await fetch("/api/getRecommend?" + queryParamString.toString());
    const data = await res.json();

    const sGenres2 = topArtists
      .slice(2, 4)
      .filter((artist) => artist.genres.length != 0)
      .map((artist) => artist.genres.slice(0, 1))
      .join(",");
    const sArtists2 = topArtists
      .slice(2, 4)
      .map((artist) => artist.id)
      .join(",");
    const queryParamString2 = new URLSearchParams({
      seed_genres: sGenres2,
      seed_artists: sArtists2,
      limit: "10"
    });
    const res2 = await fetch(
      "/api/getRecommend?" + queryParamString2.toString()
    );
    const data2 = await res2.json();
    setRecommended([...data.tracks, ...data2.tracks]);
  };

  useEffect(() => {
    if (topArtists.length != 0) fetchRecommended();

    const fetchSession = () => {
      setTopArtists(JSON.parse(sessionStorage.getItem("topArtists")!));
      setloading(false);
    };

    const fetchData = async () => {
      // ASSURE THERE IS A SESSION FIRST
      const session = await getSession();
      if (!session || session?.error) return;

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

      setloading(false);

      const today = new Date(Date.now() + 1000 * 60 * 5).getTime();
      sessionStorage.setItem("timestamp", today.toString());
    };

    if (parseInt(sessionStorage.getItem("timestamp")!) > Date.now()) {
      fetchSession();
      return;
    }

    fetchData();
  }, [loading]);

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
        <title>Your Playlists | SubWoofer</title>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <header
        className='xs:min-h-[425px]
       min-h-[80vh] relative z-50 isolate'
      >
        {topArtists?.length ?? 0 === 0 ? <Carousel items={topArtists} /> : null}
      </header>

      <main>
        {recommended?.length ?? 0 != 0 ? (
          <Playlist items={recommended} />
        ) : (
          <PlaylistLoader />
        )}
      </main>
    </>
  );
};
export default playlists;
