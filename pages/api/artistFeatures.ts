import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { audioFeatures, track } from "../../lib/api";
import { authOptions } from "./auth/[...nextauth]";

function median(arr: number[]) {
  if (arr.length % 2 != 0) {
    console.log(arr.length / 2);
    return arr[arr.length / 2 - 1];
  } else {
    const num1 = arr[arr.length / 2 - 1];
    const num2 = arr[arr.length / 2];

    return (num1 + num2) / 2;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session)
    return res.status(401).json({ error: "Unauthenticated, no access" });

  const { artist_id } = req.query;

  const marketSearchQuery = new URLSearchParams({ market: "CA" });
  const resp = await fetch(
    `https://api.spotify.com/v1/artists/${artist_id}/top-tracks?${marketSearchQuery.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    }
  );
  const data = await resp.json();

  const trackIds = (data.tracks as track[]).map((track) => track.id);
  const query = new URLSearchParams({
    ids: trackIds.join(",")
  });

  const resp2 = await fetch(
    `https://api.spotify.com/v1/audio-features?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    }
  );

  const data2 = await resp2.json();

  const audioFeatures: audioFeatures[] = data2.audio_features;
  const energy = audioFeatures
    .map((track_feature) => track_feature.energy)
    .sort();
  const loudness = audioFeatures
    .map((track_feature) => track_feature.loudness)
    .sort();
  const valence = audioFeatures.map((feature) => feature.valence).sort();
  const danceability = audioFeatures
    .map((feature) => feature.danceability)
    .sort();
  const instrumentalness = audioFeatures
    .map((feature) => feature.instrumentalness)
    .sort();
  const tempo = audioFeatures.map((feature) => feature.tempo).sort();
  const speechiness = audioFeatures
    .map((feature) => feature.speechiness)
    .sort();
  const acousticness = audioFeatures
    .map((feature) => feature.acousticness)
    .sort();

  const averageFeatures = {
    acousticness: median(acousticness),
    energy: median(energy),
    loudness: median(loudness),
    valence: median(valence),
    danceability: median(danceability),
    instrumentalness: median(instrumentalness),
    tempo: median(tempo),
    speechiness: median(speechiness),
    artist_id
  };

  return res.status(200).json(averageFeatures);
}
