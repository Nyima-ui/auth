import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: "https://auth-ebon.vercel.app/api/auth/callback/google",
      grant_type: "authorization_code",
    }),
  });

  const tokens = await tokenResponse.json();

  const profileResponse = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    },
  );

  const profile = await profileResponse.json();

  if (!profile.email) {
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }

  let user = await prisma.user.findUnique({ where: { email: profile.email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: profile.email,
        hashedPassword: "",
      },
    });
  }

  await createSession(user.id, user.email);

  return NextResponse.redirect(new URL("/", req.url));
}
