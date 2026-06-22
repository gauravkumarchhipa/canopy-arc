import type { Metadata } from "next";
import Link from "next/link";
import { tw } from "../lib/tw";

export const metadata: Metadata = {
  title: "Careers — Canopy Arc",
  description: "Join the team at Canopy Arc."
};

export default function CareersPage() {
  return (
    <div className={tw.pageShell}>
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <p className="text-xs tracking-[0.3em] uppercase text-muted">Careers</p>
        <h1 className="mt-5 font-display text-4xl sm:text-5xl tracking-tight">
          We&apos;re <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">hiring</span>.
        </h1>
        <p className="mt-5 text-muted max-w-3xl leading-relaxed">
          This is a placeholder page. Add your open roles and application flow
          here.
        </p>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link href="/contact" className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}>
            Contact Us →
          </Link>
          <Link
            href="mailto:hello@canopyarc.com"
            className={`${tw.headerBtnBase} ${tw.headerBtnGhost}`}
          >
            Email Hiring Team
          </Link>
        </div>
      </div>
    </div>
  );
}

