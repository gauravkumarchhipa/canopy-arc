export const LOADER_SESSION_KEY = "ca-loader-seen";

export function hasSeenLoader(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(LOADER_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markLoaderSeen(): void {
  try {
    sessionStorage.setItem(LOADER_SESSION_KEY, "1");
  } catch {}
}
