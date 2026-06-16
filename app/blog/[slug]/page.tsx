import Link from "next/link";
import { notFound } from "next/navigation";

const POSTS: Record<
  string,
  { title: string; date: string; body: string }
> = {
  "building-performant-nextjs-websites": {
    title: "Building performant Next.js websites",
    date: "2026-06-16",
    body:
      "Performance is a feature. This placeholder post exists so the blog routes work. Replace these posts with your real content."
  },
  "design-systems-that-scale": {
    title: "Design systems that scale",
    date: "2026-06-10",
    body:
      "A design system should make the right thing easy. Replace this placeholder with real content."
  },
  "ai-products-from-prototype-to-production": {
    title: "AI products: from prototype to production",
    date: "2026-05-30",
    body:
      "Shipping AI features requires reliability, evaluation, and security. Replace this placeholder with real content."
  }
};

export default async function BlogPostPage({
  params
}: {
  params: { slug: string };
}) {
  const post = POSTS[params.slug];
  if (!post) notFound();

  return (
    <div className="pt-24 sm:pt-28 pb-18 sm:pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/blog" className="text-sm text-muted hover:text-foreground">
          ← Back to Blog
        </Link>
        <p className="mt-6 text-xs tracking-[0.25em] uppercase text-muted">
          {post.date}
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight">
          {post.title}
        </h1>
        <article className="mt-6 rounded-3xl border border-line bg-surface p-6 sm:p-7 text-sm text-muted leading-relaxed">
          {post.body}
        </article>
      </div>
    </div>
  );
}

