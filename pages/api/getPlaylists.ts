import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  const queryParamString = new URLSearchParams({
    limit: "4"
  });
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?" +
      queryParamString.toString(),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`
      }
    }
  );
  const data = await response.json();
  return res.status(200).json(data);
}
