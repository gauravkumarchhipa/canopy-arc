import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Canopy Arc",
  description: "Terms that govern the use of the Canopy Arc website and services.",
};

export default function TermsPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-18 sm:pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs tracking-[0.3em] uppercase text-muted">
          Terms of Service
        </p>
        <h1 className="mt-5 font-display text-4xl sm:text-5xl tracking-tight">
          Plain words. <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">Fair terms.</span>
        </h1>
        <div className="mt-6 rounded-3xl border border-line bg-surface p-6 sm:p-7 text-sm text-muted leading-relaxed space-y-4">
          <p>
            This is a placeholder Terms page so footer links work. Replace with
            your company’s official Terms of Service.
          </p>
          <p>
            By using this website, you agree not to misuse the services, attempt
            to disrupt the site, or violate applicable laws.
          </p>
          <p>
            For questions, contact us at <a className="text-foreground/90 hover:underline" href="mailto:hello@canopyarc.com">hello@canopyarc.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
