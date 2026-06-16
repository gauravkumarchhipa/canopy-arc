import type { Metadata } from "next";
import Button from "../components/ui/Button";
import { siteData } from "../content/site-data";

export const metadata: Metadata = {
  title: "About Us — Canopy Arc",
  description:
    "Canopy Arc is a team of builders delivering enterprise-grade web, mobile, cloud, and AI solutions with performance, security, and great UX.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-18 sm:pb-24">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-56 -right-56 h-[760px] w-[760px] rounded-full blur-[130px] opacity-40 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.36),transparent_65%)]" />
          <div className="absolute -bottom-64 -left-64 h-[820px] w-[820px] rounded-full blur-[140px] opacity-30 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.22),transparent_65%)]" />
          <div className="absolute inset-0 opacity-18 grid-bg mask-fade-bottom" />
        </div>

        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <p className="text-xs tracking-[0.3em] uppercase text-muted">
            About Us
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight">
            We build products that{" "}
            <span className="gradient-text">ship fast</span> and{" "}
            <span className="gradient-text">scale safely</span>.
          </h1>
          <p className="mt-5 text-muted max-w-3xl leading-relaxed">
            {siteData.brand.name} is a global team of engineers, designers and
            strategists. We partner with teams to deliver high-quality software
            with modern UX, strong security, and performance that holds up in
            production.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button href="/work" className="text-sm">
              View Our Work →
            </Button>
            <Button href="/contact" variant="ghost" className="text-sm">
              Let&apos;s Talk
            </Button>
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
