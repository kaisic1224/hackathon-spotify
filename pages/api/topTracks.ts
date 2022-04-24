import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { refreshToken } from "../../lib/spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  if (Date.now() > token?.accessTokenExpires) {
    const newToken = await refreshToken(token?.refreshToken as string);
    console.log(newToken);
  }
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );
  const data = await response.json();

  return res.status(200).json(data);
};
