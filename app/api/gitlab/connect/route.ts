import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

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

  const clientId = process.env.GITLAB_REPOSITORY_CLIENT_ID;
  const redirectUri = process.env.GITLAB_REPOSITORY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: "GitLab repository authorization is not configured." },
      { status: 500 },
    );
  }

  let callbackUrl: URL;

  try {
    callbackUrl = new URL(redirectUri);

    if (
      callbackUrl.protocol !== "https:" &&
      callbackUrl.hostname !== "localhost"
    ) {
      throw new Error("HTTPS is required.");
    }
  } catch {
    return NextResponse.json(
      { error: "GitLab redirect URI is invalid." },
      { status: 500 },
    );
  }

  const state = randomBytes(32).toString("hex");
  const authorizationUrl = new URL("/oauth/authorize", "https://gitlab.com");

  authorizationUrl.searchParams.set("client_id", clientId);
  authorizationUrl.searchParams.set("redirect_uri", callbackUrl.toString());
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("state", state);
  authorizationUrl.searchParams.set(
    "scope",
    "read_user read_api read_repository",
  );

  const response = NextResponse.redirect(authorizationUrl);

  response.cookies.set("gitlab_repository_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });

  return response;
}
