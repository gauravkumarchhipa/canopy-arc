import type { Metadata } from "next";
import SignUpForm from "../components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign up — Canopy Arc",
  description: "Create your Canopy Arc account.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
