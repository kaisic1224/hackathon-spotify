import NextAuth, { User } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL } from "../../../lib/spotify";

const basic = process.env.BASIC;

const refreshToken = async (refresh_token: string) => {
  const res = await fetch("https://accounts.spotify.com/api/token", {
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
  const data = await res.json();
  console.log(data);
  return data;
};

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      authorization: LOGIN_URL
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {},
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        const newToken = {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at! * 1000,
          user: user
        };
        return newToken;
      }
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return refreshToken(token.refreshToken as string);
    },
    async session({ token, session }) {
      session.accessToken = token.accessToken;
      session.refresh_token = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.user = token.user as User;
      return session;
    }
  }
});
