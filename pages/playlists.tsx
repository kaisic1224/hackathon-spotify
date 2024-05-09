import { AnimatePresence, motion, Reorder } from "framer-motion";
import { getSession, signIn, useSession } from "next-auth/react";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { artist, playlistItem, track } from "../lib/api.d";
import Head from "next/head";
import Playlist from "../components/Playlist";
import PlaylistLoader from "../components/PlaylistLoader";
import Carousel from "../components/Carousel";
import Searchbar from "../components/Searchbar";
import useFetch from "../lib/useFetch";
import { NextPage } from "next";
import Notification from "../components/Notification";
import useArtist from "../lib/useArtist";

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

const Playlists: NextPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    }
  });

  const { topTracks, topArtists, recommended, setRecommended } = useFetch(true);
  const [notification, setNotification] = useState<track | null>(null);
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
        sm:min-h-[250px]
        lg:min-h-[350px]
        xl:min-h-[425px]
        relative z-50 isolate carousel-header'
      >
        {topArtists?.length ?? 0 === 0 ? <Carousel items={topArtists} /> : null}
      </header>

      <Notification track={notification} />
      <main className='pb-8'>
        <section className="pt-4">
          <Searchbar items={recommended} setRecommended={setRecommended} setNotification={setNotification} />
        </section>
        {recommended?.length ?? 0 != 0 ? (
          <Playlist
            items={recommended}
            setRecommended={setRecommended}
            topTracks={topTracks}
            artists={topArtists}
          />
        ) : (
          <PlaylistLoader />
        )}
      </main>
    </>
  );
};
export default Playlists;