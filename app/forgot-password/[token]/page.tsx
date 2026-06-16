"use client";

import Link from "next/link";
import { use, useEffect, useMemo } from "react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.sahai.android";
const APP_SCHEME = "sahaiaiapp";
const FALLBACK_DELAY_MS = 2500;

type Params = Promise<{ token: string }>;

function isAndroidUA() {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent || "";
  return /android/i.test(ua);
}

export default function ForgotPasswordDeepLinkPage({
  params,
}: {
  params: Params;
}) {
  const { token } = use(params);
  const isAndroid = useMemo(() => isAndroidUA(), []);

  useEffect(() => {
    if (!isAndroid) return;

    const deepLink = `${APP_SCHEME}://forgot-password/${encodeURIComponent(token)}`;
    window.location.href = deepLink;

    const fallback = window.setTimeout(() => {
      window.location.href = PLAY_STORE_URL;
    }, FALLBACK_DELAY_MS);

    const cancelOnHide = () => {
      if (document.visibilityState === "hidden") {
        window.clearTimeout(fallback);
      }
    };
    document.addEventListener("visibilitychange", cancelOnHide);

    return () => {
      window.clearTimeout(fallback);
      document.removeEventListener("visibilitychange", cancelOnHide);
    };
  }, [isAndroid, token]);

  return (
    <section className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="max-w-md text-center">
        <h1 className="font-fraunces text-3xl md:text-4xl">
          {isAndroid ? "Opening SAHAI…" : "Reset your password in the SAHAI app"}
        </h1>
        <p className="mt-4 text-base opacity-80">
          {isAndroid
            ? "If the app does not open in a few seconds, you’ll be taken to the Play Store to install it."
            : "Open this link on your phone, or install SAHAI to continue the password reset."}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href={PLAY_STORE_URL}
            className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-background"
          >
            Get SAHAI on Google Play
          </a>
          <Link href="/" className="text-sm underline opacity-80">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
