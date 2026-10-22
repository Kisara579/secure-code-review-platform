import { randomBytes } from "node:crypto";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required. Please sign in." },
      { status: 401 },
    );
  }

  const appSlug = "securereview-ai-app";
  const state = randomBytes(32).toString("hex");

  const response = NextResponse.redirect(
    `https://github.com/apps/${appSlug}/installations/new?state=${state}`,
  );

  response.cookies.set("github_install_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/github/callback",
    maxAge: 600,
  });

  return response;
}
