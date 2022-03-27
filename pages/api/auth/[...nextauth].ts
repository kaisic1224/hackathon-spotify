import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { useSession } from "next-auth/react";
import spotifyApi, { LOGIN_URL } from "../../api/lib/spotify";

const refreshAccessToken = async (token: any) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "expired",
    };
  }
};

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.username = account.providerAccountId;
        token.accessTokenExpires = account?.expires_at! * 1000;
      }
      console.log(token);
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },
  },
  async session({ session, token }) {
    session.user.accessToken = token.accessToken;
    session.user.refreshToken = token.refreshToken;
    session.user.username = token.username;
    return session;
  },
});
