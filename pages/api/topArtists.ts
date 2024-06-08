import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({message: "No valid session"});

  const rate = req.query.rate;
  const offset = req.query.offset;
  const queryParamString = new URLSearchParams({
    limit: "8",
    offset: offset ? offset.toString() : "0",
    time_range: rate ? rate.toString() : "short_term"
  });
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?" + queryParamString.toString(),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  const data = await response.json();

  if (response.status != 200) {
    console.error(response);
    return res.status(500).json({ status: response.status, error: response.statusText, data: response.json() })
  }
  return res.status(200).json(data);
}
