import Heading from "../../components/ui/Heading";
import Button from "../../components/ui/Button";
import ArrowIcon from "../../components/ui/ArrowIcon";
import GlowHoverCard from "../../components/ui/GlowHoverCard";
import { glowHoverCardLabel, glowHoverCardText, glowHoverCardTitle } from "../../components/ui/glow-card-styles";
import { formatBlogDate, type BlogPost, type BlogPostBody } from "../../content/pages/blog/posts";

export function PostHero({ post }: { post: BlogPost }) {
  return (
    <>
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {post.category} · {formatBlogDate(post.date)} · {post.readTime}
      </p>
      <Heading level={1} className="mt-4 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-tight">
        {post.title}
      </Heading>
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
    </>
  );
}

export function PostArticle({ paragraphs }: BlogPostBody) {
  return (
    <GlowHoverCard className="mt-10 p-6 sm:p-8">
      <p className={glowHoverCardLabel}>Article</p>
      <div className={`${glowHoverCardText} mt-6 space-y-5 text-base leading-relaxed`}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
    </GlowHoverCard>
  );
}

export function PostContact() {
  return (
    <GlowHoverCard className="mt-8 flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center">
      <div>
        <Heading className={glowHoverCardTitle}>Ready to start your project?</Heading>
        <p className={`${glowHoverCardText} mt-2`}>
          We help teams ship web, mobile, and AI products — from idea to production.
        </p>
      </div>
      <Button variant="header-primary"
        href="/contact"
        className={`relative z-1 shrink-0`}
      >
        Contact Us <ArrowIcon direction="right" />
      </Button>
    </GlowHoverCard>
  );
}
