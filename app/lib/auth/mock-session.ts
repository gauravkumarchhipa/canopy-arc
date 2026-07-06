import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const MOCK_SESSION_EMAIL_COOKIE = "canopy-session-email";
export const MOCK_SESSION_MODE_COOKIE = "canopy-session-mode";
export const MOCK_SESSION_MODE_VALUE = "mock";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

/** Dev mock auth: any valid email/password can sign in without Supabase. */
export function isMockAuthEnabled() {
  if (process.env.AUTH_MOCK === "false") return false;
  if (process.env.AUTH_MOCK === "true") return true;
  return process.env.NODE_ENV === "development";
}

export function getMockEmailFromRequest(request: NextRequest): string | null {
  if (request.cookies.get(MOCK_SESSION_MODE_COOKIE)?.value !== MOCK_SESSION_MODE_VALUE) {
    return null;
  }
  return request.cookies.get(MOCK_SESSION_EMAIL_COOKIE)?.value ?? null;
}

export function getMockEmailFromCookieStore(
  cookieStore: Awaited<ReturnType<typeof import("next/headers").cookies>>,
): string | null {
  if (cookieStore.get(MOCK_SESSION_MODE_COOKIE)?.value !== MOCK_SESSION_MODE_VALUE) {
    return null;
  }
  return cookieStore.get(MOCK_SESSION_EMAIL_COOKIE)?.value ?? null;
}

export function applyMockSessionCookies(response: NextResponse, email: string) {
  response.cookies.set(MOCK_SESSION_EMAIL_COOKIE, email, {
    httpOnly: true,
    path: "/",
    maxAge: SESSION_MAX_AGE,
    sameSite: "lax",
  });
  response.cookies.set(MOCK_SESSION_MODE_COOKIE, MOCK_SESSION_MODE_VALUE, {
    httpOnly: true,
    path: "/",
    maxAge: SESSION_MAX_AGE,
    sameSite: "lax",
  });
}

export function clearMockSessionCookies(response: NextResponse) {
  response.cookies.set(MOCK_SESSION_EMAIL_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(MOCK_SESSION_MODE_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
}

export function createMockSignInResponse(email: string) {
  const response = NextResponse.json({
    ok: true,
    mode: "mock",
    user: { email },
  });
  applyMockSessionCookies(response, email);
  return response;
}
