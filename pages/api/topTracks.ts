import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { refreshToken } from "../../lib/spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let token = await getToken({ req });
  if ((token?.accessTokenExpires as number) < Date.now()) {
    console.log("new token generating...");
    token = await refreshToken(token);
  }
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
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
