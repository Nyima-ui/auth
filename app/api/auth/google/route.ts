import { NextResponse } from "next/server";

export async function GET() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: "http://localhost:3000/api/auth/callback/google",
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
  });

  return NextResponse.redirect(`${rootUrl}?${params.toString()}`);
}
