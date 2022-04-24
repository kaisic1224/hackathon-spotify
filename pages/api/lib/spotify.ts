import querystring from "querystring";
import { getToken } from "next-auth/jwt";
import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
].join(",");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientid: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

export default spotifyApi;
export { LOGIN_URL };

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  return response.json();
};

const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";
const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";
const TOP_PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/playlists";

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();
  console.log("This is my at", access_token);
  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopArtists = async () => {
  const { access_token } = await getAccessToken();
  return fetch(TOP_ARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopPlaylists = async () => {
  const { access_token } = await getAccessToken();
  return fetch(TOP_PLAYLISTS_ENDPOINT, {
    headers: {
      Authroization: `Bearer ${access_token}`,
    },
  });
};
