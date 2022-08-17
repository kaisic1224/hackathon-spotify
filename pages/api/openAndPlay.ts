import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let token = await getSession({ req });
  const queryParamString = new URLSearchParams({
    ...req.query,
    max_instrumentalness: "0.35"
  });
  const devicesRes = await fetch(
    "	https://api.spotify.com/v1/me/player/devices",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`
      }
    }
  );
  const deviceData = await devicesRes.json();
  console.log(deviceData);
  const device = deviceData.devices[0];
  const response = await fetch(
    "https://api.spotify.com/v1/me/player?" + queryParamString.toString(),
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
        "Content-Type": "application/json"
      },
      body: new URLSearchParams({
        device_ids: JSON.stringify([device.id]),
        play: "true"
      })
    }
  );

  const data = await response.json();

  return res.status(200).json(data);
};
