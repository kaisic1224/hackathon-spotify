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
      refresh_token: refresh_token
    })
  });
  const data = await res.json();
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
  pages: {
    signIn: "/signin"
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.username = account.providerAccountId;
        token.accessTokenExpires = account?.expires_at! * 1000;
      }
      if (Date.now() < (token.accessTokenExpires as number)) {
        const data = refreshToken(token.refreshToken as string);
        return data;
      }

      return token;
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
