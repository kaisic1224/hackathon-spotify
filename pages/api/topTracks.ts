import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let token = await getSession({ req });
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
        Authorization: `Bearer ${token?.accessToken}`,
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
