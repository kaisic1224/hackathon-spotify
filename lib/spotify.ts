import { getToken } from "next-auth/jwt";

const scopes = [
  "user-read-email",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-modify",
  "user-read-recently-played",
  "user-top-read",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "ugc-image-upload"
].join(",");

const params = {
  scope: scopes
};

const queryParamString = new URLSearchParams(params);
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

export { LOGIN_URL };
