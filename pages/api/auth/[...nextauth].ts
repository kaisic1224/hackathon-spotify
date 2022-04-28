import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL } from "../../../lib/spotify";

const basic = process.env.BASIC;

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

  console.log("A NEW TOKEN HAS BEEN GENERATED from nextauth");
  return {
    ...token,
    accessToken: data.access_token,
    accessTokenExpires: Date.now() + data.expires_in * 1000,
    refreshToken: data.refresh_token ?? token.refreshToken
  };
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
        return { ...token };
      }

      return refreshToken(token);
    },
    async session({ token, session }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.user = token.user as User;
      return session;
    }
  }
});
