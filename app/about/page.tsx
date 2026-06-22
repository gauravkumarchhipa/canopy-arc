import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "../content/shared/brand";
import { tw } from "../lib/tw";

export const metadata: Metadata = {
  title: "About Us — Canopy Arc",
  description:
    "Canopy Arc is a team of builders delivering enterprise-grade web, mobile, cloud, and AI solutions with performance, security, and great UX.",
};

export default function AboutPage() {
  return (
    <div className={tw.pageShell}>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <p className="text-xs tracking-[0.3em] uppercase text-muted">
            About Us
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight">
            We build products that{" "}
            <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">ship fast</span> and{" "}
            <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">scale safely</span>.
          </h1>
          <p className="mt-5 text-muted max-w-3xl leading-relaxed">
            {brand.name} is a global team of engineers, designers and
            strategists. We partner with teams to deliver high-quality software
            with modern UX, strong security, and performance that holds up in
            production.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link href="/work" className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}>
              View Our Work →
            </Link>
            <Link href="/contact" className={`${tw.headerBtnBase} ${tw.headerBtnGhost}`}>
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-350 px-6 lg:px-10 mt-12 sm:mt-14">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              title: "Engineering-first",
              body: "Clean architecture, reliable delivery, and maintainable codebases."
            },
            {
              title: "Design that converts",
              body: "Polished UI with attention to hierarchy, motion, and usability."
            },
            {
              title: "Performance & security",
              body: "Fast loads, stable UI, and best-practice security by default."
            }
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-3xl border border-line bg-surface p-6"
            >
              <h2 className="text-sm font-semibold text-foreground/90">
                {c.title}
              </h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
