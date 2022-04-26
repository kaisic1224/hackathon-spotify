import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let token = await getToken({ req });
  const rate = req.query.rate;
  const queryParamString = new URLSearchParams({
    limit: "8",
    time_range: rate ? rate.toString() : "short_term"
  });
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?" + queryParamString.toString(),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  const data = await response.json();

  return res.status(200).json(JSON.stringify(data, null, 2));
};
