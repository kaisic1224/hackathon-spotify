import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "No valid session" });

  const queryParamString = new URLSearchParams({
    limit: "4",
    before: Date.now().toString()
  });

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?" +
      queryParamString.toString(),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    }
  );

  const data = await response.json();

  return res.status(200).json(data);
}
