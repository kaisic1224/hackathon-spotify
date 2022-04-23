import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  console.log(token);
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
        "Content-Type": "application/json"
      }
    }
  );
  const data = await response.json();

  return res.status(200).json(data);
};
