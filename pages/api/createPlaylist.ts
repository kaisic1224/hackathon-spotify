import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getSession({ req });

  const response = await fetch(
    `https://api.spotify.com/v1/users/${req.query.id}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`
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
