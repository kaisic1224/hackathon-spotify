import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "No valid session" });

  const { q, type, limit } = req.query;
  const queryParamString = new URLSearchParams({
    q: q as string,
    type: (type as string),
    limit: ((limit as string | undefined) ?? "1")
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

  if (response.status != 200) {
    console.error(response)
    return res.status(500).json({ status: response.status, message: response.statusText, data })
  }

  return res.status(200).json(data);
}
