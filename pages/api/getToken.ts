import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.NEXTAUTH_SECRET!;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret });
  return res.status(200).json(token);
};
