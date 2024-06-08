import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { AudioFeatures, artist, playlistItem, track } from "./api";

export interface Analysis {
  loudness: number;
  minLoudness: number;
  maxLoudness: number;
  energy: number;
  minEnergy: number;
  maxEnergy: number;
  tempo: number;
  minTempo: number;
  maxTempo: number;
  danceability: number;
  maxDanceability: number;
  minDanceability: number;
  valence: number;
  minValence: number;
  maxValence: number;
}

export default function useFetch(fetchRec = false, fetchAnalysis = false) {
  const [recentTracks, setRecent] = useState<playlistItem[]>([]);
  const [topArtists, setTopArtists] = useState<artist[]>([]);
  const [topTracks, setTopTracks] = useState<track[]>([]);
  const [recommended, setRecommended] = useState<track[]>([]);
  const [analyses, setAnalyses] = useState<Analysis>({
    energy: 0,
    minEnergy: 0,
    maxEnergy: 0,
    loudness: 0,
    minLoudness: 0,
    maxLoudness: 0,
    tempo: 0,
    minTempo: 0,
    maxTempo: 0,
    danceability: 0,
    maxDanceability: 0,
    minDanceability: 0,
    valence: 0,
    minValence: 0,
    maxValence: 0,
  });

  const fetchSession = async () => {
    const recently = await fetch("/api/getRecent");
    const recentlyData = await recently.json();
    const artists = JSON.parse(sessionStorage.getItem("topArtists")!);
    const tracks = JSON.parse(sessionStorage.getItem("topTracks")!);
    setRecent(recentlyData.items);
    setTopArtists(JSON.parse(sessionStorage.getItem("topArtists")!));
    setTopTracks(JSON.parse(sessionStorage.getItem("topTracks")!));
    if (fetchRec) fetchRecommended(artists);
    if (fetchAnalysis) fetchAnalyses(tracks);
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
      limit: "10",
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
      limit: "10",
    });
    const res2 = await fetch(
      "/api/getRecommend?" + queryParamString2.toString()
    );
    const data2 = await res2.json();
    if (res.status != 200 || res2.status != 200) {
      setRecommended([]);
    } else {
      setRecommended([...data.tracks, ...data2.tracks]);
    }
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
    if (fetchAnalysis) fetchAnalyses(topTracksData.items);
  };

  useEffect(() => {
    let ts = sessionStorage.getItem("timestamp");
    if (ts && parseInt(ts) > Date.now()) {
      fetchSession();
    } else {
      fetchData();
    }
  }, []);

  const fetchAnalyses = async (tracks: track[])=> {
    if (tracks.length === 0) {
      tracks.push({
        href: "https://api.spotify.com/v1/tracks/4eLF9Nnj2pdfxlHRJmI59L",
        id: "4eLF9Nnj2pdfxlHRJmI59L",
        name: "二等天使",
        album: {
          album_group: "compilation",
          album_type: "",
          total_tracks: 0,
          artists: [],
          available_markets: [],
          external_urls: {
            spotify: ""
          },
          href: "",
          id: "",
          images: [],
          name: "",
          release_date: "",
          release_date_precision: "",
          type: "",
          uri: ""
        },
        artists: [],
        available_markets: [],
        disc_number: 0,
        duration_ms: 0,
        explicit: false,
        external_ids: {
          isrc: "",
          ean: "",
          upc: ""
        },
        external_urls: {
          spotify: ""
        },
        is_playable: false,
        linked_from: undefined,
        popularity: 0,
        preview_url: "",
        track_number: 0,
        type: "",
        uri: "",
        is_local: false
      });
    }
    const resp = await fetch("/api/getAnalysis", {
      method: "POST",
      body: JSON.stringify({
        ids: tracks.map((t) => t.id),
      }),
    });

    const { audio_features } = await resp.json();

    let energyTotal = 0;
    let loudnessTotal = 0;
    let tempoTotal = 0;
    let valenceTotal = 0;
    let danceabilityTotal = 0;
    let energyMin = audio_features[0].energy;
    let energyMax = audio_features[0].energy;
    let loudnessMin = audio_features[0].loudness;
    let loudnessMax = audio_features[0].loudness;
    let tempoMin = audio_features[0].tempo;
    let tempoMax = audio_features[0].tempo;
    let valenceMin = audio_features[0].valence;
    let valenceMax = audio_features[0].valence;
    let danceabilityMin = audio_features[0].danceability;
    let danceabilityMax = audio_features[0].danceability;
    audio_features.forEach((t: AudioFeatures) => {
      if (t.loudness > loudnessMax) {
        loudnessMax = t.loudness;
      } else if (t.loudness < loudnessMin) {
        loudnessMin = t.loudness;
      }
      loudnessTotal += t.loudness;

      if (t.energy > energyMax) {
        energyMax = t.energy;
      } else if (t.energy < energyMin) {
        energyMin = t.energy;
      }
      energyTotal += t.energy;

      if (t.tempo > tempoMax) {
        tempoMax = t.tempo;
      } else if (t.tempo < tempoMin) {
        tempoMin = t.tempo;
      }
      tempoTotal += t.tempo;

      if (t.danceability > danceabilityMax) {
        danceabilityMax = t.danceability;
      } else if (t.danceability < danceabilityMin) {
        danceabilityMin = t.danceability;
      }
      danceabilityTotal += t.danceability;

      if (t.valence > valenceMax) {
        valenceMax = t.valence;
      } else if (t.valence < valenceMin) {
        valenceMin = t.valence;
      }
      valenceTotal += t.valence;
    });

    setAnalyses({
      tempo: tempoTotal / audio_features.length,
      minTempo: tempoMin,
      maxTempo: tempoMax,
      energy: (energyTotal / audio_features.length) * 100,
      minEnergy: energyMin,
      maxEnergy: energyMax,
      loudness: loudnessTotal / audio_features.length,
      maxLoudness: loudnessMax,
      minLoudness: loudnessMin,
      danceability: (danceabilityTotal / audio_features.length) * 100,
      maxDanceability: danceabilityMax,
      minDanceability: danceabilityMin,
      valence: (valenceTotal / audio_features.length) * 100,
      minValence: valenceMin,
      maxValence: valenceMax,
    });
  };

  return {
    analyses,
    setAnalyses,
    recentTracks,
    topTracks,
    topArtists,
    setTopArtists,
    setTopTracks,
    setRecent,
    recommended,
    setRecommended,
  };
}
