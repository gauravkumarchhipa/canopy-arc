import type { Metadata } from "next";
import Button from "../components/ui/Button";
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
        <div className="mt-8 flex items-center gap-4">
          <Button href="/contact" className="text-sm">
            Contact Us →
          </Button>
          <Button href="mailto:hello@canopyarc.com" variant="ghost" className="text-sm">
            Email Hiring Team
          </Button>
        </div>
      </div>
    </div>
  );
}

