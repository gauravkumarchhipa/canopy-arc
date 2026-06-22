import type { Metadata } from "next";
import { tw } from "../lib/tw";

export const metadata: Metadata = {
  title: "Cookie Policy — Canopy Arc",
  description: "Cookie policy for the Canopy Arc website."
};

export default function CookiesPage() {
  return (
    <div className={tw.pageShell}>
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs tracking-[0.3em] uppercase text-muted">
          Cookie Policy
        </p>
        <h1 className="mt-5 font-display text-4xl sm:text-5xl tracking-tight">
          Cookies,{" "}
          <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">kept minimal</span>.
        </h1>
        <div className="mt-6 rounded-3xl border border-line bg-surface p-6 sm:p-7 text-sm text-muted leading-relaxed space-y-4">
          <p>
            This is a placeholder Cookie Policy page so footer links work.
            Replace with your official policy.
          </p>
          <p>
            We may use essential cookies to keep the site functional and
            optional analytics cookies to improve the experience.
          </p>
        </div>
      </div>
    </div>
  );
}

