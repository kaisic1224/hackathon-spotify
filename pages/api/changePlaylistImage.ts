import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401);

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${req.query.playlist_id}/images`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      },
      body: req.body.slice(1, -1)
    }
  );

  const data = await response.json();
  return res.status(200).json(data);
};
