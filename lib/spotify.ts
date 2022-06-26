import { getToken } from "next-auth/jwt";

const basic = process.env.BASIC;

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

const refreshToken = async (token: any) => {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: token.refreshToken
    })
  });
  const data = await res.json();

  console.log("A NEW TOKEN HAS BEEN GENERATED from API URI");
  return {
    ...token,
    accessToken: data.access_token,
    accessTokenExpires: Date.now() + data.expires_in * 1000,
    refreshToken: data.refresh_token ?? token.refreshToken
  };
};

export { LOGIN_URL, refreshToken };
