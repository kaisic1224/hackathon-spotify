import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401);

  const response = await fetch(
    `https://api.spotify.com/v1/users/${req.query.id}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      },
      body: JSON.stringify({
        name: req.body.name,
        public: req.body.public,
        description: req.body.description
      })
    }
  );
  const data = await response.json();
  return res.status(200).json(data);
};
