import type { Metadata } from "next";
import Link from "next/link";
import BlogPostGrid from "../components/sections/blog/BlogPostGrid";
import GlowHoverCard from "../components/ui/GlowHoverCard";
import {
  teamBannerText,
  teamBannerTitle,
} from "../components/sections/team/team-card-styles";
import { blogPosts } from "../content/pages/blog/posts";
import { tw } from "../lib/tw";

export const metadata: Metadata = {
  title: "Blog — Canopy Arc",
  description:
    "Insights on engineering, design, AI, cloud, and product delivery from the Canopy Arc team.",
};

export default function BlogPage() {
  return (
    <div className={tw.pageShell}>
      <section className="relative">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <p className="text-xs tracking-[0.3em] uppercase text-muted">Blog</p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight">
            Updates, guides, and{" "}
            <span className={tw.gradientText}>practical insights</span>.
          </h1>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted">
            High-signal posts from our team — engineering, UX, cloud, AI, and the
            craft of shipping software that lasts.
          </p>
        </div>
      </section>

      <section className="relative mx-auto mt-12 max-w-350 px-6 sm:mt-14 lg:px-10">
        <BlogPostGrid posts={blogPosts} />
      </section>

      <section className="relative mx-auto mt-12 max-w-350 px-6 pb-4 lg:px-10">
        <GlowHoverCard className="flex flex-col items-start justify-between gap-6 rounded-3xl px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className={teamBannerTitle}>Want to build with us?</p>
            <p className={teamBannerText}>
              Tell us about your product — we&apos;ll share how we can help you ship.
            </p>
          </div>
          <Link
            href="/contact"
            className={`${tw.headerBtnBase} ${tw.headerBtnPrimary} relative z-1 shrink-0`}
          >
            Get in Touch →
          </Link>
        </GlowHoverCard>
      </section>
    </div>
  );
}
