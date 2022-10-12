import { AnimatePresence, motion, Reorder } from "framer-motion";
import { getSession, signIn, useSession } from "next-auth/react";
import { FaLink } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { artist, playlistItem, track } from "../components/Card";
import Head from "next/head";
import CardGrid from "../components/CardGrid";
import Playlist from "../components/Playlist";
import { DateContext } from ".";
import DatePicker from "../components/DatePicker";
import LoadMore from "../components/LoadMore";
import AddImage from "../components/AddImage";
import PlaylistLoader from "../components/PlaylistLoader";
import PageTransition from "../components/PageTransition";
import PageTransition2 from "../components/PageTransition2";

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

  return (
    <>
      <Head>
        <title>Your Playlists | SubWoofer</title>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <PageTransition2 direction='top' />

      {recommended?.length ?? 0 != 0 ? (
        <Playlist items={recommended} />
      ) : (
        <PlaylistLoader />
      )}
    </>
  );
};
export default playlists;
