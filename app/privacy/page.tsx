import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Canopy Arc",
  description: "Privacy policy for the Canopy Arc website."
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-18 sm:pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs tracking-[0.3em] uppercase text-muted">
          Privacy Policy
        </p>
        <h1 className="mt-5 font-display text-4xl sm:text-5xl tracking-tight">
          Your data,{" "}
          <span className="gradient-text">handled responsibly</span>.
        </h1>
        <div className="mt-6 rounded-3xl border border-line bg-surface p-6 sm:p-7 text-sm text-muted leading-relaxed space-y-4">
          <p>
            This is a placeholder Privacy Policy page so footer links work.
            Replace with your official policy.
          </p>
          <p>
            We collect only what’s needed to respond to inquiries and improve
            the site. We do not sell your personal information.
          </p>
        </div>
      </div>
    </div>
  );
}

