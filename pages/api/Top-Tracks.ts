import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { getTopTracks } from "./lib/spotify";

export default async (_: any, res: any) => {
  const response = await getTopTracks();
  const { items } = await response.json();

  if (response.status == 200 || response.status > 400) {
    console.log(response.status);
    return res.status(200).json({ isPlaying: false });
  }

  const tracks = items.slice(0, 10).map((track: any) => ({
    artist: track.artists.map((_artist: any) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }));

  return res.status(200).json({ tracks });
};
