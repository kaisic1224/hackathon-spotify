import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401);

  const {
    minAcousticness,
    maxAcousticness,
    minDanceability,
    maxDanceability,
    minInstrumentalness,
    maxInstrumentalness,
    minLoudness,
    maxLoudness,
    minPopularity,
    maxPopularity,
    minSpeechiness,
    maxSpeechiness,
    minTempo,
    maxTempo,
    seed_artists
  } = req.query;

  const queryParamString = new URLSearchParams({
    ...req.query,
    min_acousticness: (minAcousticness as string) ?? 0,
    max_acousticness: (maxAcousticness as string) ?? 1,
    min_danceability: (minDanceability as string) ?? 0,
    max_danceability: (maxDanceability as string) ?? 1,
    min_instrumentalness: (minInstrumentalness as string) ?? 0,
    max_instrumentalness: (maxInstrumentalness as string) ?? 1,
    min_loudness: (minLoudness as string) ?? -60,
    max_loudness: (maxLoudness as string) ?? 0,
    min_popularity: (minPopularity as string) ?? 0,
    max_popularity: (maxPopularity as string) ?? 100,
    min_speechiness: (minSpeechiness as string) ?? 0,
    max_speechiness: (maxSpeechiness as string) ?? 1,
    min_tempo: (minTempo as string) ?? 60,
    max_tempo: (maxTempo as string) ?? 260,
    seed_artists: seed_artists as string
  });

  const response = await fetch(
    "https://api.spotify.com/v1/recommendations?" + queryParamString.toString(),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  const data = await response.json();

  return res.status(200).json(data);
}
