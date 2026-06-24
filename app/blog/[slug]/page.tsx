import Link from "next/link";
import { notFound } from "next/navigation";
import GlowHoverCard from "../../components/ui/GlowHoverCard";
import {
  glowHoverCardLabel,
  glowHoverCardText,
  glowHoverCardTitle,
} from "../../components/ui/glow-card-styles";
import {
  formatBlogDate,
  getBlogPost,
  blogPosts,
} from "../../content/pages/blog/posts";
import { tw } from "../../lib/tw";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post not found — Canopy Arc" };
  return {
    title: `${post.title} — Canopy Arc Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className={tw.pageShell}>
      <article className="relative mx-auto max-w-3xl px-6 lg:px-10">
        <Link
          href="/blog"
          className="text-sm font-medium text-accent transition-colors hover:text-foreground"
        >
          ← Back to Blog
        </Link>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {post.category} · {formatBlogDate(post.date)} · {post.readTime}
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-tight">
          {post.title}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted">{post.excerpt}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-background/70 px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <GlowHoverCard className="mt-10 p-6 sm:p-8">
          <p className={glowHoverCardLabel}>Article</p>
          <div className={`${glowHoverCardText} mt-6 space-y-5 text-base leading-relaxed`}>
            {post.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </GlowHoverCard>

        <GlowHoverCard className="mt-8 flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className={glowHoverCardTitle}>Ready to start your project?</h2>
            <p className={`${glowHoverCardText} mt-2`}>
              We help teams ship web, mobile, and AI products — from idea to production.
            </p>
          </div>
          <Link
            href="/contact"
            className={`${tw.headerBtnBase} ${tw.headerBtnPrimary} relative z-1 shrink-0`}
          >
            Contact Us →
          </Link>
        </GlowHoverCard>
      </article>
    </div>
  );
}
