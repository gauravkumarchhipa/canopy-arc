export function formatAuthError(message: string): string {
  const normalized = message.toLowerCase();

  if (message === "Invalid login credentials") {
    return "Invalid email or password. Please try again.";
  }

  if (
    normalized.includes("fetch failed") ||
    normalized.includes("failed to fetch") ||
    normalized.includes("enotfound") ||
    normalized.includes("network")
  ) {
    return "Cannot connect to Supabase. Check NEXT_PUBLIC_SUPABASE_URL in .env.local (project may be paused or URL incorrect).";
  }

  if (normalized.includes("user already registered")) {
    return "An account with this email already exists. Try signing in.";
  }

  return message;
}

export function isConnectionError(message: string): boolean {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("fetch failed") ||
    normalized.includes("failed to fetch") ||
    normalized.includes("enotfound") ||
    normalized.includes("network")
  );
}
