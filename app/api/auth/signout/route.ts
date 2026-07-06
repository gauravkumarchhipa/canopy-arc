import { NextResponse } from "next/server";
import { clearMockSessionCookies } from "../../../lib/auth/mock-session";
import { createSupabaseRouteClient } from "../../../lib/supabase/route-client";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  const supabase = await createSupabaseRouteClient();
  if (supabase) {
    await supabase.auth.signOut();
  }

  clearMockSessionCookies(response);
  return response;
}
