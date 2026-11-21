import EditorialHero from "../components/layout/EditorialHero";
import Button from "../components/ui/Button";
import ArrowIcon from "../components/ui/ArrowIcon";
import BlogPostGrid from "../components/sections/blog/BlogPostGrid";
import GlowHoverCard from "../components/ui/GlowHoverCard";
import {
  teamBannerText,
  teamBannerTitle,
} from "../components/sections/team/team-card-styles";
import { blogPosts } from "../content/pages/blog/posts";
import { tw } from "../lib/tw";

export function BlogHero() {
  return (
    <EditorialHero
      eyebrow="Blog"
      title={<>
        Updates, guides, and{" "}
        <span className={tw.gradientText}>practical insights</span>.
      </>}
      subtitle="High-signal posts from our team — engineering, UX, cloud, AI, and the craft of shipping software that lasts."
    />
  );
}

export function BlogArticles() {
  return (
    <section className="relative mx-auto mt-12 max-w-350 px-6 sm:mt-14 lg:px-10">
      <BlogPostGrid posts={blogPosts} />
    </section>
  );
}

export function BlogContact() {
  return (
    <section className="relative mx-auto mt-12 max-w-350 px-6 pb-4 lg:px-10">
      <GlowHoverCard className="flex flex-col items-start justify-between gap-6 rounded-3xl px-6 py-5 sm:flex-row sm:items-center">
        <div>
          <p className={teamBannerTitle}>Want to build with us?</p>
          <p className={teamBannerText}>
            Tell us about your product — we&apos;ll share how we can help you ship.
          </p>
        </div>
        <Button variant="header-primary"
          href="/contact"
          className={`relative z-1 shrink-0`}
        >
          Get in Touch <ArrowIcon direction="right" />
        </Button>
      </GlowHoverCard>
    </section>
  );
}
