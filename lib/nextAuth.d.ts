import nextAuth, { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: "refresh error";
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires: number;
    user: User | AdapterUser;
  }
}