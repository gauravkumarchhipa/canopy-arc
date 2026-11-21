import ArrowIcon from "../../components/ui/ArrowIcon";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBlogPost,
  blogPosts,
} from "../../content/pages/blog/posts";
import { tw } from "../../lib/tw";
import { PostArticle, PostContact, PostHero } from "./PostSections";

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
          <ArrowIcon direction="left" /> Back to Blog
        </Link>

        <PostHero post={post} />
        <PostArticle paragraphs={post.paragraphs} />
        <PostContact />
      </article>
    </div>
  );
}
