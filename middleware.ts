import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getMockEmailFromRequest } from "./app/lib/auth/mock-session";

const AUTH_PAGES = ["/signin", "/signup"];
const PROTECTED_PREFIXES = ["/dashboard"];

function getSupabaseKeys() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

function isAuthPage(pathname: string) {
  return AUTH_PAGES.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function redirectTo(request: NextRequest, pathname: string, search?: Record<string, string>) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  if (search) {
    for (const [key, value] of Object.entries(search)) {
      url.searchParams.set(key, value);
    }
  }
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const mockEmail = getMockEmailFromRequest(request);
  const keys = getSupabaseKeys();

  if (!keys) {
    const isAuthenticated = Boolean(mockEmail);

    if (!isAuthenticated && isProtectedPath(pathname)) {
      return redirectTo(request, "/signin", { redirectTo: pathname });
    }

    if (isAuthenticated && isAuthPage(pathname)) {
      return redirectTo(request, "/dashboard");
    }

    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(keys.url, keys.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthenticated = Boolean(user || mockEmail);

  if (!isAuthenticated && isProtectedPath(pathname)) {
    return redirectTo(request, "/signin", { redirectTo: pathname });
  }

  if (isAuthenticated && isAuthPage(pathname)) {
    return redirectTo(request, "/dashboard");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
