import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  const uris = req.query.songs;

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${req.query.playlist_id}/tracks?` +
      new URLSearchParams({ uris: uris as string }),
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    }
  );
  const data = await response.json();

  return res.status(200).json(JSON.stringify(data, null, 2));
};
