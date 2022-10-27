import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401);
  const rate = req.query.rate;
  const offset = req.query.offset;
  const queryParamString = new URLSearchParams({
    limit: "8",
    offset: offset ? offset.toString() : "0",
    time_range: rate ? rate.toString() : "short_term"
  });
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?" + queryParamString.toString(),
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
    console.log(`tracks: ${response.statusText}`);
  }
  return res.status(200).json(data);
};
