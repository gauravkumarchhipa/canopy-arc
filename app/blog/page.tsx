import type { Metadata } from "next";
import Link from "next/link";
import { tw } from "../lib/tw";

export const metadata: Metadata = {
  title: "Blog — Canopy Arc",
  description: "Insights on engineering, design, AI, and product delivery."
};

export default function BlogPage() {
  const posts = [
    {
      slug: "building-performant-nextjs-websites",
      title: "Building performant Next.js websites",
      excerpt: "A practical checklist for shipping fast, stable, and scalable UIs.",
      date: "2026-06-16"
    },
    {
      slug: "design-systems-that-scale",
      title: "Design systems that scale",
      excerpt: "How to keep UI consistent while moving quickly across teams.",
      date: "2026-06-10"
    },
    {
      slug: "ai-products-from-prototype-to-production",
      title: "AI products: from prototype to production",
      excerpt: "Making AI features reliable, secure, and measurable in real apps.",
      date: "2026-05-30"
    }
  ];

  return (
    <div className={tw.pageShell}>
      <section className="mx-auto max-w-350 px-6 lg:px-10">
        <p className="text-xs tracking-[0.3em] uppercase text-muted">Blog</p>
        <h1 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight">
          Updates, guides, and{" "}
          <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">practical insights</span>.
        </h1>
        <p className="mt-5 text-muted max-w-3xl leading-relaxed">
          Short, high-signal posts from the team — engineering, UX, cloud, and AI.
        </p>
      </section>

      <section className="mx-auto max-w-350 px-6 lg:px-10 mt-12 sm:mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="rounded-3xl border border-line bg-surface p-6 hover:-translate-y-1 transition-transform"
          >
            <p className="text-xs text-muted">{p.date}</p>
            <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
              {p.title}
            </h2>
            <p className="mt-3 text-sm text-muted leading-relaxed">{p.excerpt}</p>
            <p className="mt-5 text-sm text-foreground/80">Read →</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

