import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { artist, playlistItem, track } from "./api";

export default function useFetch(fetchRec = false) {
  const [recentTracks, setRecent] = useState<playlistItem[]>([]);
  const [topArtists, setTopArtists] = useState<artist[]>([]);
  const [topTracks, setTopTracks] = useState<track[]>([]);
  const [recommended, setRecommended] = useState<track[]>([]);

  const fetchSession = async () => {
    const recently = await fetch("/api/getRecent");
    const recentlyData = await recently.json();
    const artists = JSON.parse(sessionStorage.getItem("topArtists")!);
    setRecent(recentlyData.items);
    setTopArtists(JSON.parse(sessionStorage.getItem("topArtists")!));
    setTopTracks(JSON.parse(sessionStorage.getItem("topTracks")!));
    if (fetchRec) fetchRecommended(artists);
  };

  const fetchData = async () => {
    // ASSURE THERE IS A SESSION FIRST
    const session = await getSession();
    if (!session || session.error) return;

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

    if (fetchRec) fetchRecommended(topData.items);
  };

  const fetchRecommended = async (topArt: artist[]) => {
    const sGenres = topArt
      .slice(0, 2)
      .filter((artist) => artist.genres.length != 0)
      .map((artist) => artist.genres.slice(0, 1))
      .join(",");
    const sArtists = topArt
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

    const sGenres2 = topArt
      .slice(2, 4)
      .filter((artist) => artist.genres.length != 0)
      .map((artist) => artist.genres.slice(0, 1))
      .join(",");
    const sArtists2 = topArt
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

    // const filteredTracks = new Set([...data.tracks, ...data2.tracks]);

    setRecommended([...data.tracks, ...data2.tracks]);
    console.log(recommended);
  };

  useEffect(() => {
    if (parseInt(sessionStorage.getItem("timestamp")!) > Date.now()) {
      fetchSession();
    } else {
      fetchData();
    }
  }, []);

  return {
    recentTracks,
    topTracks,
    topArtists,
    setTopArtists,
    setTopTracks,
    setRecent,
    recommended,
    setRecommended
  };
}
