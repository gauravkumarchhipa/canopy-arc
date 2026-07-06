import { NextResponse } from "next/server";
import { createMockSignInResponse, isMockAuthEnabled } from "../../../lib/auth/mock-session";
import { formatAuthError, isConnectionError } from "../../../lib/auth/messages";
import { signUpSchema } from "../../../lib/auth/schemas";
import { getSupabaseEnv } from "../../../lib/supabase/env";
import { createSupabaseRouteClient } from "../../../lib/supabase/route-client";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = signUpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  if (isMockAuthEnabled()) {
    return createMockSignInResponse(parsed.data.email);
  }

  const env = getSupabaseEnv();
  if (!env) {
    return createMockSignInResponse(parsed.data.email);
  }

  const origin = new URL(request.url).origin;

  try {
    const supabase = await createSupabaseRouteClient();
    if (!supabase) {
      return createMockSignInResponse(parsed.data.email);
    }

    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      if (isConnectionError(error.message)) {
        return createMockSignInResponse(parsed.data.email);
      }

      return NextResponse.json(
        { error: formatAuthError(error.message) },
        { status: 400 },
      );
    }

    if (!data.user) {
      return NextResponse.json(
        { error: "Sign up failed. Please try again." },
        { status: 400 },
      );
    }

    if (!data.session) {
      return NextResponse.json({
        ok: true,
        needsEmailConfirmation: true,
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      });
    }

    return NextResponse.json({
      ok: true,
      mode: "supabase",
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Sign up failed.";
    if (isConnectionError(message)) {
      return createMockSignInResponse(parsed.data.email);
    }

    return NextResponse.json(
      { error: "Sign up failed. Please try again." },
      { status: 500 },
    );
  }
}
