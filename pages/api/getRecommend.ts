import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let token = await getToken({ req });
  const queryParamString = new URLSearchParams({
    ...req.query,
    max_instrumentalness: "0.35"
  });
  const response = await fetch(
    "https://api.spotify.com/v1/recommendations?" + queryParamString.toString(),
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
