import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let token = await getSession({ req });
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

  return res.status(200).json(data);
};
