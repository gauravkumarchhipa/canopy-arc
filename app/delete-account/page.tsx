import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import DeleteAccountFormSection from "./sections/DeleteAccountFormSection";
import ClosingSection from "./sections/ClosingSection";
import { tw } from "../lib/tw";

export const metadata: Metadata = {
  title: "Delete account — SAHAI",
  description:
    "Request deletion of your SAHAI account and personal data. We process requests within two working days.",
};

export default function DeleteAccountPage() {
  return (
    <div className={tw.pageShellBottom}>
      <PageHero
        eyebrow="Delete account"
        title={
          <>
            Close your account
            <br />
            with
            <br />
            <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">clarity.</span>
          </>
        }
        blurb="Submit your registered email, mobile number, and a short reason. We verify and process deletion within two working days."
      />

      <DeleteAccountFormSection />

      <ClosingSection />
    </div>
  );
}
