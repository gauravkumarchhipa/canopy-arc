import type { Metadata } from "next";
import { Suspense } from "react";
import SignInForm from "../components/SignInForm";

export const metadata: Metadata = {
  title: "Sign in — Canopy Arc",
  description: "Sign in to your Canopy Arc account.",
};

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}