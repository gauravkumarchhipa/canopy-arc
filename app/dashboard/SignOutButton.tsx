"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../components/ui/Button";

export default function SignOutButton() {
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
    <Button
      type="button"
      variant="ghost"
      className="mt-6 w-full"
      disabled={signingOut}
      onClick={handleSignOut}
    >
      {signingOut ? "Signing out…" : "Sign out"}
    </Button>
  );
}
