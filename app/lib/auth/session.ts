import { cookies } from "next/headers";
import { getMockEmailFromCookieStore, isMockAuthEnabled } from "./mock-session";
import { createSupabaseRouteClient } from "../supabase/route-client";

export type AppSession = {
  email: string;
  mode: "supabase" | "mock";
};

export async function getAppSession(): Promise<AppSession | null> {
  const cookieStore = await cookies();
  const mockEmail = getMockEmailFromCookieStore(cookieStore);
  if (mockEmail) {
    return { email: mockEmail, mode: "mock" };
  }

  const supabase = await createSupabaseRouteClient();
  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  return { email: user.email, mode: "supabase" };
}

export { isMockAuthEnabled };
