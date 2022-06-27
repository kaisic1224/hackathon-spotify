import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getSession({ req });
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token?.accessToken}`
    }
  });
  const data = await response.json();

  return res.status(200).json(JSON.stringify(data, null, 2));
};
