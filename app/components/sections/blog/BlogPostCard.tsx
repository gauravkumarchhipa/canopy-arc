import Link from "next/link";
import type { BlogPost } from "../../../content/pages/blog/posts";
import { formatBlogDate } from "../../../content/pages/blog/posts";
import {
  blogCardBodyGlow,
  blogCardBodyGradient,
  blogCardBodyPattern,
  blogCardExcerpt,
  blogCardImage,
  blogCardImageGrid,
  blogCardImageInitial,
  blogCardImageWash,
  blogCardLink,
  blogCardMeta,
  blogCardShell,
  blogCardTag,
  blogCardTitle,
} from "./blog-card-styles";

type Props = {
  post: BlogPost;
};

export default function BlogPostCard({ post }: Props) {
  const initials = post.title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Link href={`/blog/${post.slug}`} className={blogCardShell}>
      <div className={blogCardImage}>
        <div className={blogCardImageWash} aria-hidden />
        <div className={blogCardImageGrid} aria-hidden />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={blogCardImageInitial}>{initials}</span>
        </div>
      </div>
      <div className={blogCardBodyGlow}>
        <div className={blogCardBodyGradient} aria-hidden />
        <div className={blogCardBodyPattern} aria-hidden />
        <div className={blogCardMeta}>
          <span>{post.category}</span>
          <span className="text-muted/50 group-hover/card:text-white/40">·</span>
          <span>{formatBlogDate(post.date)}</span>
          <span className="text-muted/50 group-hover/card:text-white/40">·</span>
          <span>{post.readTime}</span>
        </div>
        <h2 className={blogCardTitle}>{post.title}</h2>
        <p className={blogCardExcerpt}>{post.excerpt}</p>
        <div className="relative z-1 mt-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={blogCardTag}>
              {tag}
            </span>
          ))}
        </div>
        <span className={blogCardLink}>Read article →</span>
      </div>
    </Link>
  );
}
