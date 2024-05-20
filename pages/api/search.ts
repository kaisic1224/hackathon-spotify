import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401);

  const { q, type } = req.query;
  const queryParamString = new URLSearchParams({
    q: q as string,
    type: (type as string),
    limit: "1"
  });
  const response = await fetch(
    "https://api.spotify.com/v1/search?" + queryParamString.toString(),
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  const data = await response.json();

  return res.status(200).json(data);
}
