import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "No valid session" });

  const response = await fetch(
    "https://api.spotify.com/v1/recommendations/available-genre-seeds",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  if (response.status != 200) {
    return res.status(201).json({message: response.statusText})
  }
  const data = await response.json();

  return res.status(200).json(data);
}

