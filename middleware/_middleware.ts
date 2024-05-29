import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

    const path = req.nextUrl.pathname;

    if (path?.includes("/api/auth") || token) {
        return NextResponse.next();
    }

    if (!token && (path?.includes("/api/")) || path != "/signin") {
        return NextResponse.redirect("/signin")
    }
}