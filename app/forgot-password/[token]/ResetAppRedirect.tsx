"use client";

import { useEffect } from "react";
import { PLAY_STORE_URL } from "./reset-app";

const FALLBACK_DELAY_MS = 2500;

export default function ResetAppRedirect({ token }: { token: string }) {
  useEffect(() => {
    window.location.href = `sahaiaiapp://forgot-password/${encodeURIComponent(token)}`;
    const fallback = window.setTimeout(() => {
      window.location.href = PLAY_STORE_URL;
    }, FALLBACK_DELAY_MS);

    const cancelOnHide = () => {
      if (document.visibilityState === "hidden") window.clearTimeout(fallback);
    };
    document.addEventListener("visibilitychange", cancelOnHide);

    return () => {
      window.clearTimeout(fallback);
      document.removeEventListener("visibilitychange", cancelOnHide);
    };
  }, [token]);

  return null;
}
