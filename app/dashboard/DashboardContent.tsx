"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../components/ui/Button";
import GlowHoverCard from "../components/ui/GlowHoverCard";
import {
  glowHoverCardText,
  glowHoverCardTitle,
} from "../components/ui/glow-card-styles";
import { tw } from "../lib/tw";

type Props = {
  email: string;
};

export default function DashboardContent({ email }: Props) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      router.push("/signin");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className={`${tw.pageShell} ${tw.pageShellBottom}`}>
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <p className="text-xs tracking-[0.3em] uppercase text-muted">Dashboard</p>
        <h1 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight">
          Welcome back
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          You are signed in as{" "}
          <span className="font-medium text-foreground">{email}</span>.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <GlowHoverCard className="p-6 sm:p-7 lg:col-span-2">
            <h2 className={glowHoverCardTitle}>Your workspace</h2>
            <p className={`${glowHoverCardText} mt-4`}>
              This is your protected dashboard. Only signed-in users with a valid
              session cookie can access this page.
            </p>
          </GlowHoverCard>

          <GlowHoverCard className="p-6 sm:p-7">
            <h2 className={glowHoverCardTitle}>Account</h2>
            <p className={`${glowHoverCardText} mt-4 break-all`}>{email}</p>
            <Button
              type="button"
              variant="ghost"
              className="mt-6 w-full"
              disabled={signingOut}
              onClick={handleSignOut}
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </Button>
          </GlowHoverCard>
        </div>
      </div>
    </div>
  );
}
