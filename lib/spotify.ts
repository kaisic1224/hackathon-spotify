import { getToken } from "next-auth/jwt";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const basic = process.env.BASIC;
const redirect_uri = "http://localhost:3000";
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const scopes = [
  "user-read-email",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played"
].join(",");

const params = {
  scope: scopes
};

const queryParamString = new URLSearchParams(params);
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const refreshToken = async (refresh_token: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token
    })
  });

  return response.json();
};

export { LOGIN_URL, refreshToken, basic };
